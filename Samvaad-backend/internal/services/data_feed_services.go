package services

import (
	"errors"
	"github.com/prabal-parmar/Samvaad-AI/internal/models"
	"github.com/prabal-parmar/Samvaad-AI/internal/repositories"
)

func FeedGoalData(req models.GoalDataModel) (*models.GoalDataResponseModel, error) {
	if req.DisplayName == "" {
		return nil, errors.New("Display Name is mandatory field!");
	}

	if req.Type == "" {
		return nil, errors.New("Type is mandatory field!")
	}

	goal,err:=repositories.CheckGoalExists(req.Type, req.DisplayName);
	if goal != nil {
		return &models.GoalDataResponseModel{
			ID: goal.ID,
			Message: "This goal is already present in db!",
		}, nil
	}
	
	newGoal,err:=repositories.CreateNewGoal(&req)
	if err != nil {
		return nil, err
	}

	return &models.GoalDataResponseModel{
		ID: newGoal.ID,
		Message: "Goal created successfully!",
	}, nil
}

func FetchGoalData() (models.GETResponseStructure, error) {
	goals,err:=repositories.FetchAllGoals();
	if err != nil {
		return models.GETResponseStructure{
			Data: []models.GoalDataModel{},
			Error: err.Error(),
		}, err
	}

	return models.GETResponseStructure{
		Data: goals,
		Message: "Goal Data sent successfully!",

	}, nil
}