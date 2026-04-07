package di

import (
	"fmt"
	"os"
	"shortLink-app/internals/handlers"
	"shortLink-app/internals/repositories"
	"shortLink-app/internals/services"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

type Container struct {
	db  *pgxpool.Pool
	rdb *redis.Client

	// USER
	userRepo    *repositories.UserRepository
	userService *services.UserServices
	userHandler *handlers.UserHandler
}

func NewContainer(db *pgxpool.Pool) *Container {
	godotenv.Load()
	redisClient := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%s", os.Getenv("REDIS_HOST"), os.Getenv("REDIS_PORT")),
		Password: "",
		DB:       0,
	})

	container := &Container{
		db:  db,
		rdb: redisClient,
	}

	container.initDependencies()

	return container
}

func (c *Container) initDependencies() {

	// USER
	c.userRepo = repositories.NewUserrepository(c.db, c.rdb)
	c.userService = services.NewUserServices(c.userRepo)
	c.userHandler = handlers.NewUserHandler(c.userService)
}

func (c *Container) UserHandler() *handlers.UserHandler {
	return c.userHandler
}
