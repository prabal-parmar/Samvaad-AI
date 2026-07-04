package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	pkg "github.com/prabal-parmar/Samvaad-AI/pkg/jwt"
)

func Authenticate() gin.HandlerFunc {
	return func (c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader=="" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Authorization header is required.",
			})
			c.Abort();
			return;
		}

		if !strings.HasPrefix(authHeader, "Bearer ") {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Wrong format of authorization",
			})
			c.Abort()
			return;
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		claims,err:=pkg.ValidateToken(tokenString);
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": err.Error(),
			})
			c.Abort();
			return;
		}

		c.Set("userID", claims.UserID);
		c.Set("email", claims.Email);

		c.Next();
	}
}