package models

import "time"

type Link struct {
	ID          int        `json:"id" db:"id"`
	UserID      int        `json:"user_id" db:"user_id"`
	OriginalURL string     `json:"original_url" db:"original_url"`
	Slug        string     `json:"slug" db:"slug"`
	CreatedAt   time.Time  `json:"created_at" db:"created_at"`
	DeletedAt   *time.Time `json:"deleted_at,omitempty" db:"deleted_at"`
}