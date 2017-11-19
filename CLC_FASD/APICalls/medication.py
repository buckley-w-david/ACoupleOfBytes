from CLC_FASD import models
from django.utils.timezone import now, localtime
from django.db.models import Max

def addMedication(medicationName, dosage, time, daysOfWeek, taken, medId, userId):
	medication = models.Medication()
	medication.name = medicationName
	medication.dosage = dosage
	medication.time = time
	medication.day = daysOfWeek
	medication.taken = False
	medication.medId = medId
	medication.user = models.User.objects.get(id=userId)

	medication.save()

	return medication

def removeMedication(medicationId, userId):
	instance = models.User.objects.get(id=userId)
	instance.medication_set.get(medId=medicationId).delete()

'''def editMedication(medicationId, medicationName, dosage, time, daysOfWeek, taken, userId):
	removeMedication(medicationId, userId)
	addMedication(medicationName, dosage, time, daysOfWeek, taken, userId)'''

def getMedications(userId):
	instance = models.User.get(id=userId)
	return instance.medication_set.all()

def getPastDue(userId):
	instance = models.User.get(id=userId)
	current = localtime(now())
	day = current.weekday()

	for medication in instance.medication_set.all():
		if (not medication.taken and medication.time <= time and day == medication.day):
			yield medication

def newMedId():
	return Medication.objects.all().aggregate(Max('medId'))+1