package models

type GoalDataModel struct {
	ID uint `json:"id" gorm:"primaryKey"`
	DisplayName string `json:"display_name"`
	Type string `json:"type"`
	Description string `json:"description,omitempty"`
}

type GoalDataResponseModel struct {
	ID uint `json:"id" gorm:"primaryKey"`
	Message string `json:"msg"`
}