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

type UserProfile struct {
	ID uint `json:"id" gorm:"primaryKey"`

	UserID uint `json:"user_id"`

	TalkingScore float32 `json:"talking_score"`
	ConfidenceScore float32 `json:"confidence_score"`
	CommunicationScore float32 `json:"communication_score"`
}
