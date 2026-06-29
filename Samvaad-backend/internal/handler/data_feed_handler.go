package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/prabal-parmar/Samvaad-AI/internal/models"
	"github.com/prabal-parmar/Samvaad-AI/internal/services"
)

func FeedGoalData(c *gin.Context) {
	var req models.GoalDataModel;

	if err:=c.ShouldBindJSON(&req); err!=nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return;
	}

	res,err:=services.FeedGoalData(req);

	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return;
	}

	c.JSON(201, res)
}

func FetchGoalData(c *gin.Context) {
	res,err:=services.FetchGoalData();
	if err!= nil {
		c.JSON(400, gin.H{
			"error": err,
		})
		return;
	}
	c.JSON(200, res);
}