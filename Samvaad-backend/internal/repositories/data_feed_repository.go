package repositories

import (
	"github.com/prabal-parmar/Samvaad-AI/configs"
	"github.com/prabal-parmar/Samvaad-AI/internal/models"
)

func CheckGoalExists(goalType string, displayName string) (*models.GoalDataModel, error) {
	var goal *models.GoalDataModel;

	err:=configs.DB.Where("type=? AND display_name=?", goalType, displayName).First(&goal).Error
	if err != nil {
		return nil, err
	}

	return goal, nil
}

func CreateNewGoal(req *models.GoalDataModel) (*models.GoalDataModel, error) {
	result:=configs.DB.Create(&req);
	
	if result.Error != nil {
		return nil, result.Error
	}

	return req, nil
}

func FetchAllGoals() ([]models.GoalDataModel, error) {
	var goals []models.GoalDataModel

	err:=configs.DB.Find(&goals).Error
	if err != nil {
		return []models.GoalDataModel{}, err
	}

	return goals, nil
}