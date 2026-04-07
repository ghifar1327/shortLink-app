package dto

import "time"

type CreateLinkRequest struct {
	UserID      int    `json:"user_id" db:"user_id"`
	OriginalURL string `json:"original_url" db:"original_url"`
	Slug        string `json:"slug" db:"slug"`
}

type LinkResponse struct {
	ID          int       `json:"id" db:"id"`
	OriginalURL string    `json:"original_url" db:"original_url"`
	Slug        string    `json:"slug" db:"slug"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}
