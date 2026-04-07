package handlers

import (
	"net/http"
	"strconv"

	"shortLink-app/internals/dto"
	"shortLink-app/internals/services"

	"github.com/gin-gonic/gin"
)

type LinkHandler struct {
	service *services.LinkServices
}

func NewLinkHandler(s *services.LinkServices) *LinkHandler {
	return &LinkHandler{service: s}
}

// CreateLink godoc
// @Summary Create a new short link
// @Description Create a new short link for a user
// @Tags Links
// @Accept json
// @Produce json
// @Param link body dto.CreateLinkRequest true "Create Link Request"
// @Success 200 {object} dto.Response
// @Failure 400 {object} dto.Response
// @Failure 500 {object} dto.Response
// @Router /api/links [post]
func (h *LinkHandler) CreateLink(ctx *gin.Context) {
	var req dto.CreateLinkRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, dto.Response{
			Success: false,
			Message: err.Error(),
			Results: nil,
		})
		return
	}

	err := h.service.CreateLink(ctx, req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dto.Response{
			Success: false,
			Message: err.Error(),
			Results: nil,
		})
		return
	}

	ctx.JSON(http.StatusOK, dto.Response{
		Success: true,
		Message: "Link created",
		Results: nil,
	})
}

// GetAllLinkByUserID godoc
// @Summary Get all links by user ID
// @Description Retrieve all short links for a specific user
// @Tags Links
// @Accept json
// @Produce json
// @Param user_id path int true "User ID"
// @Success 200 {object} dto.Response
// @Failure 400 {object} dto.Response
// @Failure 500 {object} dto.Response
// @Router /api/links/{user_id} [get]
func (h *LinkHandler) GetAllLinkByUserID(ctx *gin.Context) {
	userID, err := strconv.Atoi(ctx.Param("user_id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, dto.Response{
			Success: false,
			Message: "Invalid ID",
		})
		return
	}

	data, err := h.service.GetAllLinkByUserID(ctx, userID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dto.Response{
			Success: false,
			Message: err.Error(),
			Results: nil,
		})
		return
	}

	ctx.JSON(http.StatusOK, dto.Response{
		Success: true,
		Message: "list of links",
		Results: data,
	})
}

// SoftDeleteLink godoc
// @Summary Soft delete a link
// @Description Soft delete a link by ID and return updated list of links
// @Tags Links
// @Accept json
// @Produce json
// @Param id path int true "Link ID"
// @Success 200 {object} dto.Response
// @Failure 400 {object} dto.Response
// @Failure 500 {object} dto.Response
// @Router /api/links/{id} [delete]
func (h *LinkHandler) SoftDeleteLink(ctx *gin.Context) {
	id, err:= strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, dto.Response{
			Success: false,
			Message: "Invalid ID",
		})
		return
	}

	links, err := h.service.SoftDeleteLink(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dto.Response{
			Success: false,
			Message: err.Error(),
			Results: nil,
		})
		return
	}
	ctx.JSON(http.StatusOK, dto.Response{
		Success: true,
		Message: "Deleted (soft)",
		Results: links,
	})
}