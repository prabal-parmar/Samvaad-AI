package models

import "github.com/golang-jwt/jwt/v5"

type LoginRequest struct {
	Email string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token string `json:"token"`
	Username string `json:"username"`
}

type RegisterResponse struct {
	Token string `json:"token"`
	Username string `json:"username"`
}

type Claims struct {
	UserID uint
	Email string
	Username string

	jwt.RegisteredClaims
}