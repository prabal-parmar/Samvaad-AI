package services

import (
	"errors"
	"github.com/prabal-parmar/Samvaad-AI/internal/models"
	"github.com/prabal-parmar/Samvaad-AI/internal/repositories"
	"github.com/prabal-parmar/Samvaad-AI/pkg/jwt"
	"github.com/prabal-parmar/Samvaad-AI/pkg/utils"
)


func Login(req models.LoginRequest) (*models.LoginResponse, error){
	if req.Username == nil && req.Email == nil {
		return nil, errors.New("Need on of Email or Username.")
	}

	var user *models.User
	if req.Email != nil {
		email,err:=repositories.CheckEmailExists(*req.Email);
		if !email {
			return nil, errors.New("Email not found!")
		}

		user,err=repositories.FindUserWithEmail(*req.Email);
		if err != nil {
			return nil, err
		}
	} else {
		username,err:=repositories.CheckUsernameExists(*req.Username);
		if !username {
			return nil, errors.New("Username not found!")
		}

		user,err=repositories.FindUserWithUsername(*req.Username);
		if err != nil {
			return nil, err
		}
	}
	// Common Logic
	check,err:=utils.ComparePassword(user.Password, req.Password);
	if err != nil {
		return nil, err
	}

	if !check {
		return nil, errors.New("Password didn't match!")
	}
	token,err:=pkg.GenerateToken(user.ID, user.Email, user.Username);
	if err != nil {
		return nil, err
	}
	return &models.LoginResponse{
		Token: token,
		Username: user.Username,
	}, err
}

func Register(req models.User) (*models.RegisterResponse, error){
	if (req.Username == "") {
		return nil, errors.New("username is required")
	}
	if(req.Email == "") {
		return nil, errors.New("email is required")
	}
	if(req.Firstname == "") {
		return nil, errors.New("firstname is required")
	}
	if(req.Password == "") {
		return nil, errors.New("password is required")
	}

	_, err := repositories.CheckEmailExists(req.Email);
	if err != nil {
		return nil, err
	}

	_, err = repositories.CheckUsernameExists(req.Username);
	if err != nil {
		return nil, err
	}

	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}
	req.Password = hashedPassword

	user, err := repositories.RegisterUser(&req)
	if err != nil {
		return nil, err
	}

	token, err := pkg.GenerateToken(user.ID, user.Email, user.Username);
	if err != nil {
		return nil, err
	}

	return &models.RegisterResponse{
		Token: token,
		Username: user.Username,
	}, nil
}

func Logout() (interface{}, error){
	return nil, errors.New("Something went wrong!")
}