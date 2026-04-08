package handlers

import (
	"net/http"
	"path/filepath"
	"shortLink-app/internals/dto"
	"shortLink-app/internals/models"
	"shortLink-app/internals/services"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgconn"
)

type UserHandler struct {
	service *services.UserServices
}

func NewUserHandler(s *services.UserServices) *UserHandler {
	return &UserHandler{service: s}
}

// ==================================================================== register

// Register godoc
// @Summary Register new user
// @Description Create a new user account
// @Tags Authentication
// @Accept json
// @Produce json
// @Param user body dto.RegisterRequest true "Register Request"
// @Success 200 {object} dto.Response
// @Failure 400 {object} dto.Response
// @Router /api/auth/register [post]
func (h *UserHandler) Register(ctx *gin.Context) {
	var req dto.RegisterRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, dto.Response{
			Success: false,
			Message: "Invalid request body",
		})
		return
	}

	err := h.service.Register(ctx, req)
	if err != nil {

		if pgErr, ok := err.(*pgconn.PgError); ok {
			if pgErr.Code == "23505" {
				ctx.JSON(401, dto.Response{
					Success: false,
					Message: "Email already registered",
				})
				return
			}
		}
		ctx.JSON(http.StatusBadRequest, dto.Response{
			Success: false,
			Message: "Internal server error",
		})
		return
	}
	ctx.JSON(http.StatusOK, dto.Response{
		Success: true,
		Message: "User registered successfully",
	})
}

// Login godoc
// @Summary Login new user
// @Description Create a new user account
// @Tags Authentication
// @Accept json
// @Produce json
// @Param user body dto.LoginRequest true "Login Request"
// @Success 200 {object} dto.Response
// @Failure 400 {object} dto.Response
// @Router /api/auth/login [post]
func (h *UserHandler) Login(ctx *gin.Context) {
	var req dto.LoginRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, dto.Response{
			Success: false,
			Message: err.Error(),
		})
		return
	}

	user, err := h.service.GetUserBYEmail(ctx.Request.Context(), req.Email)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dto.Response{
			Success: false,
			Message: err.Error(),
		})
		return
	}
	token, err := h.service.Login(ctx.Request.Context(), req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dto.Response{
			Success: false,
			Message: err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, dto.Response{
		Success: true,
		Message: "Login Success",
		Results: dto.LoginResponse{
			Email:  user.Email,
			UserID: user.ID,
			Name:   user.Name,
			Picture: user.Picture,
			CreatedAt: user.CreatedAt.String(),
			Token:  token,
		},
	})
}


// UploadPicture godoc
// @Summary Upload profile picture for user
// @Description Upload a profile picture for a specific user by user ID. Max size 1MB.
// @Tags Users
// @Accept multipart/form-data
// @Produce json
// @Param id path int true "User ID"
// @Param picture formData file true "Profile picture file"
// @Success 200 {object} dto.Response{results=models.User} "Picture uploaded successfully"
// @Failure 400 {object} dto.Response "Bad request (invalid ID or missing/too large file)"
// @Failure 500 {object} dto.Response "Internal server error"
// @Router /user/{id}/picture [post]
func (h *UserHandler) UploadPicture(ctx *gin.Context) {
	idParam := ctx.Param("id")

	id, err := strconv.Atoi(idParam)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, dto.Response{
			Success: false,
			Message: "Invalid user id",
			Results: nil,
		})
		return
	}

	file, err := ctx.FormFile("picture")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, dto.Response{
			Success: false,
			Message: "Picture is required",
			Results: nil,
		})
		return
	}

	if file.Size > 1*1024*1024 {
		ctx.JSON(http.StatusBadRequest, dto.Response{
			Success: false,
			Message: "file too large (max 1MB)",
		})
		return
	}

	ext := filepath.Ext(file.Filename)
	filename :=  "picture_" + strconv.Itoa(id) + ext

	err = ctx.SaveUploadedFile(file, "./uploads/"+filename)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dto.Response{
			Success: false,
			Message: "failed to save file",
		})
		return
	}

	user, err := h.service.UpdateProfilePicture(ctx.Request.Context(), id, filename)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, dto.Response{
			Success: false,
			Message: err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, dto.Response{
		Success: true,
		Message: "Picture uploaded successfully",
		Results: models.User{
			ID:      user.ID,
			Email:   user.Email,
			Name:    user.Name,
			Picture: user.Picture,
			CreatedAt: user.CreatedAt,
		},
	})
}