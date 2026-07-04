package models

type User struct {
	ID uint `json:"id" gorm:"primaryKey"`
	Username string `json:"username"`
	Firstname string `json:"firstname"`
	Lastname string `json:"lastname"`
	PhoneNumber string `json:"phone_number"`
	Email string `json:"email"`
	PrimaryGoal string `json:"pgoal"`
	Password string `json:"password"`

	Profile *UserProfile `json:"profile,omitempty"`
}

// User Profile for Profile page and details
type UserProfile struct {
	ID uint `json:"id" gorm:"primaryKey"`

	UserID uint `json:"user_id"`
	User User

	// Need to check later
	MetricID []uint `json:"metric_id"`
	Metric []UserChatOverallMetricModel
}
