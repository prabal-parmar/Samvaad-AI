package models

type LoginRequest struct {
	email string `json:"email"`
	username string `json:"username"`
	password string `json:"password"`
}

type LoginResponse struct {
	token string `json:"token"`
	username string `json:"username"`
}

type RegisterRequest struct {
	firstname string `json:"firstname"`
	lastname string `json:"lastname"`
	number int `json:"number"`
	email string `json:"email"`
	password string `json:"password"`
	pGoal string `json:"primaryGoal"`
}

type RegisterResponse struct {
	token string `json:"token"`
	username string `json:"username"`
}