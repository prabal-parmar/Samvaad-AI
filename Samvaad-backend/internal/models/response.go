package models

// To be used for every GET response
type GETResponseStructure struct {
	Data any `json:"data"`
	Message string `json:"message,omitempty"`
	Error string `json:"error,omitempty"`
}