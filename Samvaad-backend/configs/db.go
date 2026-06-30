package configs

import (
	"fmt"
	"os"
	"github.com/joho/godotenv"
	"github.com/prabal-parmar/Samvaad-AI/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	if err := godotenv.Load(); err != nil {
		fmt.Println("Environment file not found")
	}

	// As curently no password is required for postgres login
	// Need to change
	password := os.Getenv("DB_PASSWORD")
	if password == "" {
		password = "''"
	}

	psql := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		password,
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_SSLMODE"),
	)

	var err error;
	DB, err = gorm.Open(postgres.Open(psql), &gorm.Config{})

	if err != nil {
		fmt.Println("Error in connecting to DB!")
		return;
	}
	fmt.Println("Connected to PostgreSQL successfuly")

	// Run migrations{
	if err := DB.AutoMigrate(
		&models.User{}, 
		&models.UserProfile{}, 
		&models.GoalDataModel{},
		); err != nil {
		fmt.Println("Error running migrations:", err)
		return
	}
	fmt.Println("Migrations completed successfully")
}