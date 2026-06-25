package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/prabal-parmar/Samvaad-AI/internal/handler"
)

func SetupRoutes(router *gin.Engine) {

	router.GET("/", func (c *gin.Context){
		c.JSON(200, gin.H{
			"message": "Backend Started for Samvaad!",
		})
	})

	auth := router.Group("/api/auth");
	{
		auth.POST("/register", handler.Register);
		auth.POST("/login", handler.Login);
		// Logout to add
	}
}