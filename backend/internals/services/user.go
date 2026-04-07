package services

import (
	"context"
	"errors"
	"shortLink-app/internals/dto"
	"shortLink-app/internals/models"
	"shortLink-app/internals/repositories"
	"shortLink-app/internals/utils"
	"strings"
	"time"
)

type UserServices struct {
	repo *repositories.UserRepository
}

func NewUserServices(repo *repositories.UserRepository) *UserServices{
	return &UserServices{
		repo: repo,
	}
}

func validateUser(req dto.RegisterRequest) error {
	if !strings.Contains(req.Email, "@") || !strings.Contains(req.Email, ".") {
		return errors.New("Invalid email format")
	}
	if strings.Index(req.Email, "@") > strings.Index(req.Email, ".") {
		return errors.New("Invalid email domain format")
	}
	if len(req.Password) < 5 {
		return errors.New("Password must be at least 5 characters")
	}
	if req.Password != req.ConfirmPassword{
		return errors.New("comfirm password is not matching")
	}
	return nil
}

func (r *UserServices) Register(ctx context.Context, req dto.RegisterRequest) error {
	if err := validateUser(req); err != nil {
		return err
	}
	hash, err := utils.HashPassword(req.Password)
	if err != nil {
		return err
	}

	newUser := models.User{
		Email:        req.Email,
		PasswordHash: hash,
		CreatedAt:    time.Now(),
	}

	return r.repo.CreateUser(ctx, newUser)
}

func (r UserServices) Login(ctx context.Context, req dto.LoginRequest) (string, error) {
	user, err := r.repo.GetUserByEmail(ctx, req.Email)
	if err != nil {
		return "", errors.New("Email not Registered")
	}
	valid, err := utils.VerifyPassword(req.Password, user.PasswordHash)

	if err != nil {
		return "", err
	}
	if valid {
		token, err := utils.GenerateToken(user)
		if err != nil {
			return "", err
		}
		return token, nil
	} else {
		return "", errors.New("Invalid Password")
	}
}

func (s *UserServices) GetUserBYEmail(ctx context.Context, email string) (*models.User, error) {
	return s.repo.GetUserByEmail(ctx, email)
}
