package repositories

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"shortLink-app/internals/dto"
	"shortLink-app/internals/models"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

type UserRepository struct {
	db  *pgxpool.Pool
	rdb *redis.Client
}

func NewUserrepository(db *pgxpool.Pool, rdb *redis.Client) *UserRepository {
	return &UserRepository{
		db:  db,
		rdb: rdb,
	}
}

// ====================================================================================================================================================  Create User

func (r *UserRepository) CreateUser(ctx context.Context, u dto.RegisterRequest) error {
	tx, err := r.db.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return err
	}

	defer func() {
		if err != nil {
			tx.Rollback(ctx)
		}
	}()

	query := `INSERT INTO users (name, email, password_hash, created_at) VALUES ($1, $2, $3, $4)`
	_, err = tx.Exec(ctx, query, u.Name, u.Email, u.Password, time.Now())
	if err != nil {
		return err
	}

	err = tx.Commit(ctx)
	if err != nil {
		return err
	}

	return nil
}

// ==================================================================================================================================================== Get User By ID
func (r *UserRepository) GetUserByID(ctx context.Context, id int) (*models.User, error) {
	fmt.Println(id)
	key := fmt.Sprintf("user:id:%d", id)

	// ================= CACHE =================
	cached, err := r.rdb.Get(ctx, key).Result()
	if err == nil {
		var result models.User
		if err := json.Unmarshal([]byte(cached), &result); err == nil {
			return &result, nil
		}
	}

	// ================= DB =================
	query := `
		SELECT 
			u.id, 
			u.name,
			u.email,
			u.created_at,
			p.url AS picture FROM users u
			LEFT JOIN profile_pictures p ON u.id = p.user_id
		WHERE u.id=$1
	`

	rows, err := r.db.Query(ctx, query, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	user, err := pgx.CollectOneRow(rows, pgx.RowToStructByName[models.User])
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, fmt.Errorf("user not found")
		}
		return nil, err
	}

	// ================= CACHE =================
	data, err := json.Marshal(user)
	if err == nil {
		r.rdb.Set(ctx, key, data, time.Minute*15)
	}

	return &user, nil
}

// ======================================================================================================== DELETE USER
func (r *UserRepository) DeleteUser(ctx context.Context, id int) error {
	query := `DELETE FROM users WHERE id=$1`
	_, err := r.db.Exec(ctx, query, id)
	r.rdb.Del(ctx, fmt.Sprintf("user:id:%d", id))
	return err
}

func (r *UserRepository) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	query := `
		SELECT
		u.id, 
		u.name,
		u.email,
		u.password_hash,
		u.created_at,
		p.url AS picture FROM users u
		LEFT JOIN profile_pictures p ON u.id = p.user_id
		WHERE u.email=$1
	`
	row, err := r.db.Query(ctx, query, email)
	if err != nil {
		return nil, err
	}

	defer row.Close()

	var user models.User
	if row.Next() {
		err = row.Scan(&user.ID, &user.Name, &user.Email, &user.PasswordHash, &user.CreatedAt, &user.Picture)
		if err != nil {
			return nil, err
		}
	} else {
		return nil, fmt.Errorf("user not found")
	}

	if err = row.Err(); err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) UpdateProfilePicture(ctx context.Context, userId int, pictureURL string) (models.User, error) {
	
	tx, err := r.db.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return models.User{}, err
	}
	defer func() {
		if err != nil {
			tx.Rollback(ctx)
		}
	}()

	_, err = tx.Exec(ctx, "DELETE FROM profile_pictures WHERE user_id = $1", userId)
	if err != nil {
		return models.User{}, err
	}

	_, err = tx.Exec(ctx, "INSERT INTO profile_pictures (user_id, url) VALUES ($1, $2)", userId, pictureURL)
	if err != nil {
		return models.User{}, err
	}

	if err = tx.Commit(ctx); err != nil {
		return models.User{}, err
	}

	user, err := r.GetUserByID(ctx, userId)
	if err != nil {
		return models.User{}, err
	}

	return *user, nil
}
