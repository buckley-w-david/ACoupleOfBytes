from CLC_FASD import models
from django.utils.timezone import now, localtime
from django.db.models import Max, Min


def addMedication(medicationName, dosage, time, day, medId, userId):
	medication = models.Medication()
	medication.name = medicationName
	medication.dosage = dosage
	medication.time = time
	medication.day = day
	medication.taken = False
	medication.medId = medId
	medication.user = models.User.objects.get(id=userId)

	medication.save()

	return medication

def removeMedication(medicationId, userId):
	return models.Medication.objects.filter(user=userId, medId=medicationId).delete()

'''
def editMedication(medicationId, medicationName, dosage, time, daysOfWeek, taken, userId):
	removeMedication(medicationId, userId)
	addMedication(medicationName, dosage, time, daysOfWeek, taken, userId)'''

def getMedications(userId):
	return models.Medication.objects.filter(user=userId)


def getMedication(userId, medId):
	return models.Medication.objects.filter(user=userId, medId=medId)


def getPastDue(userId):
	print(userId)
	current = localtime(now())
	day = current.weekday()
	print(day, current.time(), type(current.time()))

	return models.Medication.objects.filter(user=userId, day = day, taken=False, time__lte = current.time())


def getNextDue(userId):
	current = localtime(now())
	day = current.weekday()

	return models.Medication.objects.filter(user=userId, day = day, time__gte = current.time()).order_by('time')[0]


def newMedId():
	return (models.Medication.objects.all().aggregate(Max('medId'))['medId__max'] or 0)+1