package main

import (
	"context"
	"fmt"
	"os"
	"shortLink-app/internals/di"
	"shortLink-app/internals/routes"
	_ "shortLink-app/docs"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

// @title Short Link API
// @version 1.0
// @description This is a coffee shop backend API
// @host localhost:8888
// @BasePath /
func main() {
	godotenv.Load()
	dbURL := os.Getenv("DATABASE_URL")

	pool, err := pgxpool.New(context.Background(), dbURL)
	if err != nil {
		panic(err)
	}

	r := gin.Default()

	r.Static("/uploads", "./uploads")
	container := di.NewContainer(pool)

	routes.Router(r, container)

	r.Run(fmt.Sprintf(":%s", os.Getenv("PORT")))
}
