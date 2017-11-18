from CLC_FASD import models
import uuid

#username, password
def login(un, pw):
    if Users.objects.filter(username=un).exists():
        if Users.objects.filter(username=un, password=pw).exists():
            sk = uuid.uuid1()
            user = Users.objects.get(username=un, password=pw)
            user.sessionKey = sk
            user.save()
            return str(sk)
        else:
            return "Invalid password"
    else:
        return "No user with username"

#session key
def logout(sk):
    if sk == "":
        return "Invalid session key"
    elif Users.objects.filter(sessionKey=sk).exists():
        user = Users.objects.get(sessionKey=sk)
        user.sessionKey = ""
        user.save()
        return "Logged out"
    else:
        return "Invalid session key"

#session key
def getUsernameBySessionKey(sk):
    if Users.objects.filter(sessionKey=sk).exists():
        user = Users.objects.get(sessionKey=sk)
        un = user.username
        return str(un)
    else:
        return "No user with username"