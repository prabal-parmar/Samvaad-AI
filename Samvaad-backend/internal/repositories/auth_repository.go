package repositories

import (
	"errors"

	"github.com/prabal-parmar/Samvaad-AI/configs"
	"github.com/prabal-parmar/Samvaad-AI/internal/models"
	"gorm.io/gorm"
)

func RegisterUser(user *models.User) (*models.User, error) {
	err := configs.DB.Create(user).Error
	if err != nil {
		return nil, err
	}

	return user, nil
}

func CheckEmailExists(email string) (bool, error) {
	var user models.User;
	err := configs.DB.Where("email=?", email).First(&user).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return false, nil
		}

		return false, err
	}

	return true, errors.New("Email already exists!")
}

func CheckUsernameExists(username string) (bool, error) {
	var user models.User;
	err := configs.DB.Where("username=?", username).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return false, nil
		}
		return false, err
	}
	return true, errors.New("Username already exists!")
}

func FindUserWithEmail(email string) (*models.User, error) {
	var user *models.User;
	err := configs.DB.Where("email=?", email).First(&user).Error
	
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return user, nil
}

func FindUserWithUsername(email string) (*models.User, error) {
	var user *models.User;
	err := configs.DB.Where("username=?", email).First(&user).Error
	
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return user, nil
}