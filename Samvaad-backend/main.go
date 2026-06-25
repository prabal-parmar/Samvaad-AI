package main

import (
	"github.com/gin-gonic/gin"
	"github.com/prabal-parmar/Samvaad-AI/configs"
)

func main() {

	configs.ConnectDB();
	router := gin.Default()

	router.GET("/", func (c *gin.Context) {
		c.JSON(200, gin.H{"message": "Hello World!!"})
	})
}