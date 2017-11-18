from CLC_FASD import models
from django.utils.timezone import now, localtime

def addMedication(medicationName,dosage,time,daysOfWeek,taken,sessionKey):
	medication = models.Medication()
	medication.name= medicationName
	medication.dosage = dosage
	medication.time = time
	medication.day = daysOfWeek
	medication.taken=False
	medication.save()
	models.Users.objects.get(sessionKey=sessionKey).medication.add(medication)

def removeMedication(medicationName,dosage,time,sessionKey):
	instance = models.Users.objects.get(sessionKey=sessionKey)
	instanceMed = instance.medication.get(name=medicationName,dosage=dosage,time=time).delete()

def editMedication(medicationName,dosage,time,daysOfWeek,taken,sessionKey):
	self.removeMedication(medicationName,dosage,time,sessionKey)
	self.addMedication(medicationName,dosage,time,daysOfWeek,taken,sessionKey)

def getMedications(sessionKey):
	instance = models.Users.get(sessionKey=sessionKey)
	return instance.medication

def getPastDue(sessionKey):
	instance = models.Users.get(sessionKey=sessionKey)
	time = localtime(now()).time()
	for medication in instance.medication:
		if(not medication.taken and medication.time<=time):
			yield medication
