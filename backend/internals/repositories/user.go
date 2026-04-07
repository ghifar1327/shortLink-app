package repositories

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
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

func (r *UserRepository) CreateUser(ctx context.Context, u models.User) error {
	query := `INSERT INTO users ( email, password_hash, created_at) VALUES ($1, $2, $3)`
	_, err := r.db.Exec(ctx, query,
		u.Email,
		u.PasswordHash,
		u.CreatedAt)

	return err
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
			id, 
			email,
			password_hash,
			created_at FROM users
		WHERE id=$1
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
	key := fmt.Sprintf("user:email:%s", email)

	cached, err := r.rdb.Get(ctx, key).Result()
	if err == nil {
		var result models.User
		if err := json.Unmarshal([]byte(cached), &result); err == nil {
			return &result, nil
		}
	}
	query := `
		SELECT 
			id,
			email,
			password,
			created_at
		FROM users
		WHERE email=$1
	`
	row, err := r.db.Query(ctx, query, email)
	if err != nil {
		return nil, err
	}

	defer row.Close()

	user, err := pgx.CollectOneRow(row, pgx.RowToStructByName[models.User])
	if err != nil {
		return nil, err
	}

	data, err := json.Marshal(user)
	if err == nil {
		r.rdb.Set(ctx, key, data, time.Minute*15)
	}

	return &user, nil
}