package models

import "time"

type User struct {
	ID           int       `json:"id" db:"id"`
	Picture      *string   `json:"picture" db:"picture"`
	Name         string    `json:"name" db:"name"`
	Email        string    `json:"email" db:"email"`
	PasswordHash string    `json:"-" db:"-"`
	CreatedAt    time.Time `json:"created_at" db:"created_at"`
}
