package routes

import (
	"shortLink-app/internals/di"
	"shortLink-app/internals/middleware"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func Router(r *gin.Engine, container *di.Container) {

	r.Use(middleware.CorsMiddleware())

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"success": "welcome to backend",
		})
	})

	// handler
	userHandler := container.UserHandler()

	auth := r.Group("/auth")
	{
		auth.POST("/login", userHandler.Login)
		auth.POST("/register", userHandler.Register)
	}
}
