package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/prabal-parmar/Samvaad-AI/internal/models"
	"github.com/prabal-parmar/Samvaad-AI/internal/services"
)

func Register(c *gin.Context) {
	var req models.User;

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H {
			"error": err.Error(),
		})
		return;
	}

	response,err := services.Register(req)

	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, response);
}

func Login(c *gin.Context) {
	var req models.LoginRequest;

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H {
			"error": err.Error(),
		})
		return;
	}

	response, err := services.Login(req);

	if err != nil {
		c.JSON(401, gin.H{
			"error": err.Error(),
		})
		return;
	}

	c.JSON(200, response)
}