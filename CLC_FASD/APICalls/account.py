from CLC_FASD.models import User
import uuid

#username, password
def login(username, password):
    if User.objects.filter(username=username, sessionKey=None).exists():
        if User.objects.filter(username=username, password=password).exists():
            sk = uuid.uuid1()
            user = User.objects.get(username=username, password=password)
            user.sessionKey = sk
            user.save()
            return str(sk)
        else:
            return False
    else:
        return False

#session key
def logout(userId):
    if User.objects.filter(id=userId).exists():
        user = User.objects.get(id=userId)
        user.sessionKey = None
        user.save()
        return True
    else:
        return False

#session key
def getIdBySessionKey(sessionKey):
    if User.objects.filter(sessionKey=sessionKey).exists():
        return User.objects.get(sessionKey=sessionKey).id
    else:
        return False
    
#username, password, sessionKey, userType
def signup(username, password, firstname, lastname, email):
    if User.objects.filter(username=username, userType="Participant").exists():
        return False
    else:
        newUser = User.objects.create(username=username, 
            password=password, 
            firstname=firstname, 
            lastname=lastname, 
            email=email, 
            userType="Participant")

        newUser.save()
        return newUser