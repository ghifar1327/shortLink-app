package repositories

import (
	"context"
	"errors"
	"os"
	"shortLink-app/internals/dto"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"
)

type LinkRepository struct {
	db *pgxpool.Pool
}

func NewLinkRepository(db *pgxpool.Pool) *LinkRepository {
	return &LinkRepository{db: db}
}
func (r *LinkRepository) CreateLink(ctx context.Context, link dto.CreateLinkRequest) error {
	query := `
	INSERT INTO links (user_id, original_url, slug, created_at)
	VALUES ($1,$2,$3,$4)
	`

	_, err := r.db.Exec(ctx, query,
		link.UserID,
		link.OriginalURL,
		link.Slug,
		time.Now(),
	)
	if err != nil {
		return err
	}

	if err != nil {
		if pgErr, ok := err.(*pgconn.PgError); ok {
			if pgErr.Code == "23505" {
				return errors.New("slug already exists")
			}
		}
		return err
	}

	return nil
}

func (r *LinkRepository) GetAllLinkByUserID(ctx context.Context, userId int) ([]dto.LinkResponse, error) {
	query := `
	SELECT id, original_url, slug, created_at
	FROM links
	WHERE user_id = $1 AND deleted_at IS NULL
	`
	rows, err := r.db.Query(ctx, query, userId)
	if err != nil {
		return nil, err
	}

	links, err := pgx.CollectRows(rows, pgx.RowToStructByName[dto.LinkResponse])
	if err != nil {
		return nil, err
	}
	baseURL := os.Getenv("BACKEND_URL")

	for i := range links {
		link := baseURL + "/" + links[i].Slug
		links[i].ShortLink = &link
	}

	return links, nil
}

func (r *LinkRepository) GetBySlug(ctx context.Context, slug string) (string, error) {
	query := `
		SELECT original_url
		FROM links
		WHERE slug=$1 AND deleted_at IS NULL
	`

	var url string
	err := r.db.QueryRow(ctx, query, slug).Scan(&url)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return "", errors.New("link not found")
		}
		return "", err
	}

	return url, nil
}

func (r *LinkRepository) SoftDeleteLink(ctx context.Context, id int) ([]dto.LinkResponse, error) {
	var userId int
	err := r.db.QueryRow(ctx, "SELECT user_id FROM links WHERE id=$1", id).Scan(&userId)
	if err != nil {
		return nil, err
	}

	_, err = r.db.Exec(ctx, "UPDATE links SET deleted_at=$1 WHERE id=$2", time.Now(), id)
	if err != nil {
		return nil, err
	}

	return r.GetAllLinkByUserID(ctx, userId)
}
