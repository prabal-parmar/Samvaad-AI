package main

import (
	"github.com/gin-gonic/gin"
	"github.com/prabal-parmar/Samvaad-AI/configs"
	"github.com/prabal-parmar/Samvaad-AI/internal/routes"
)

func main() {

	configs.ConnectDB();
	router := gin.Default()

	routes.SetupRoutes(router);

	router.Run(":8080")
}