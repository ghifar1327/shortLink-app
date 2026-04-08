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

	r.GET("/:slug", linkHandler.RedirectLink)
	auth := r.Group("/api/auth")
	{
		auth.POST("/login", userHandler.Login)
		auth.POST("/register", userHandler.Register)
	}

	user := r.Group("/api/user")
	user.Use(middleware.AuthMiddleware())
	{
		user.POST("/:id/picture", userHandler.UploadPicture)
	}
	link := r.Group("/api/links")
	link.Use(middleware.AuthMiddleware())
	{
		link.POST("", linkHandler.CreateLink)
		link.GET("/:user_id", linkHandler.GetAllLinkByUserID)
		link.DELETE("/:id", linkHandler.SoftDeleteLink)
	}
}
