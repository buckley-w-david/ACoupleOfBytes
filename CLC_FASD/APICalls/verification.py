from CLC_FASD import models

def validSession(sk):
	return models.User.objects.filter(sessionKey=sk).exists()