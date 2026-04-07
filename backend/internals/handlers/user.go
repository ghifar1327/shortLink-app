package handlers

import (
	"net/http"
	"shortLink-app/internals/dto"
	"shortLink-app/internals/services"

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
// @Router /auth/register [post]
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
// @Router /auth/login [post]
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
			Token:  token,
		},
	})
}
