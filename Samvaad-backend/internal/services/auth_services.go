package services

import (
	"errors"
	"github.com/prabal-parmar/Samvaad-AI/internal/models"
)


func Login(req models.LoginRequest) (*models.LoginResponse, error){
	// Login service function logic here
	return nil, errors.New("Something went wrong!")
}

func Register(req models.User) (*models.LoginResponse, error){
	// Register service function logic here
	return nil, errors.New("Something went wrong!")
}

func Logout() (interface{}, error){
	return nil, errors.New("Something went wrong!")
}