package middleware

import (
	"net/http"
	"shortLink-app/internals/dto"
	"shortLink-app/internals/utils"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {

		authHeader := ctx.GetHeader("Authorization")

		if authHeader == "" {
			ctx.JSON(http.StatusUnauthorized, dto.Response{
				Success: false,
				Message: "Authorization header required",
			})
			ctx.Abort()
			return
		}

		if !strings.HasPrefix(authHeader, "Bearer ") {
			ctx.JSON(http.StatusUnauthorized, dto.Response{
				Success: false,
				Message: "Invalid token format",
			})
			ctx.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		claims, err := utils.VerifyToken(tokenString)
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, dto.Response{
				Success: false,
				Message: "Invalid or expired token",
			})
			ctx.Abort()
			return
		}

		ctx.Set("user_id", claims.Id)

		ctx.Next()
	}
}
