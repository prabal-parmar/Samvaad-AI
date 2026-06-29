package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/prabal-parmar/Samvaad-AI/internal/handler"
	"github.com/prabal-parmar/Samvaad-AI/internal/middleware"
)

func SetupRoutes(router *gin.Engine) {

	router.Use(cors.Default())
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

	data := router.Group("/api/data");
	{
		data.POST("/goal", handler.FeedGoalData);
		data.GET("/goal", handler.FetchGoalData);
	}

	chats := router.Group("/api/chat").Use(middleware.Authenticate());
	{
		chats.GET("/analysis", handler.ChatAnalysis)
	}
}