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
	linkHandler := container.LinkHandler()

	auth := r.Group("/auth")
	{
		auth.POST("/login", userHandler.Login)
		auth.POST("/register", userHandler.Register)
	}
	link := r.Group("links")
	{
		link.POST("", linkHandler.CreateLink)
		link.GET("/:user_id", linkHandler.GetAllLinkByUserID)
		link.DELETE("/:id", linkHandler.SoftDeleteLink)
	}
}
