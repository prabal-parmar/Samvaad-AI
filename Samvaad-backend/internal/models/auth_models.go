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

type RegisterResponse struct {
	token string `json:"token"`
	username string `json:"username"`
}