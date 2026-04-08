package services

import (
	"context"
	"shortLink-app/internals/dto"
	"shortLink-app/internals/repositories"
	"shortLink-app/internals/utils"
)

type LinkServices struct {
	repo *repositories.LinkRepository
}

func NewLinkServices(repo *repositories.LinkRepository) *LinkServices {
	return &LinkServices{
		repo: repo,
	}
}
func (s *LinkServices) CreateLink(ctx context.Context, link dto.CreateLinkRequest) error {
	if link.Slug == "" {
		link.Slug = utils.GenerateSlug(5)
	}
	return s.repo.CreateLink(ctx, link)
}
func (s *LinkServices) GetAllLinkByUserID(ctx context.Context, id int) ([]dto.LinkResponse, error) {
	return s.repo.GetAllLinkByUserID(ctx, id)
}

func (s *LinkServices) RedirectLink(ctx context.Context, slug string) (string, error) {
	return s.repo.GetBySlug(ctx, slug)
}

func (s *LinkServices) SoftDeleteLink(ctx context.Context, id int) ([]dto.LinkResponse, error) {
	return s.repo.SoftDeleteLink(ctx, id)
}
