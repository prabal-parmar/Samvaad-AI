package models

type User struct {
	ID uint `json:"id"`
	Username string `json:"username"`
	Firstname string `json:"firstname"`
	Lastname string `json:"lastname"`
	Email string `json:"email"`
	PrimaryGoal string `json:"pgoal"`
	Password string `json:"-"`
}

type UserProfile struct {
	ID uint `json:"id"`

	UserID uint `json:"userID"`
	User User `json:"user" gorm:"foreignKey:UserID"` 

	TalkingScore float32 `json:"talkingScore"`
	ConfidenceScore float32 `json:"confidenceScore"`
	CommunicationScore float32 `json:"communicationScore"`
}
