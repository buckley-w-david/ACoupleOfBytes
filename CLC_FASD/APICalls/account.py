from CLC_FASD.models import User
import uuid

#username, password
def login(un, pw):
    if User.objects.filter(username=un).exists():
        if User.objects.filter(username=un, password=pw).exists():
            sk = uuid.uuid1()
            user = User.objects.get(username=un, password=pw)
            user.sessionKey = sk
            user.save()
            return str(sk)
        else:
            return False
    else:
        return False

#session key
def logout(sk):
    if sk == "":
        return False
    elif User.objects.filter(sessionKey=sk).exists():
        user = User.objects.get(sessionKey=sk)
        user.sessionKey = ""
        user.save()
        return True
    else:
        return False

#session key
def getUsernameBySessionKey(sk):
    if User.objects.filter(sessionKey=sk).exists():
        user = User.objects.get(sessionKey=sk)
        un = user.username
        return str(un)
    else:
        return False