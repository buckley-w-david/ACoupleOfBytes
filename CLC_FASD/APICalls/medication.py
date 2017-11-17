from CLC_FASD.models import Medication
from django.core.managament.base import BaseCommand, CommandError


class MedicationCalls():
	def __init__():
		self.medicationName=""
		self.time=0
		self.daysOfWeek=""
		self.user=""

	def addMedication(self,medicationName,dosage,time,daysOfWeek,user):
		medication = Medication()
		medication.medicationName = medicationName
		medication.dosage = dosage
		medication.time = time
		medication.daysOfWeek = daysOfWeek
		medication.user = user
		medication.save()

	def removeMedication(self,medicationName,user):
		instance = Medication.objects.get(user=user, medicationName=medicationName)
		instance.delete()

	def editMedication(self,medicationName,dosage,time,daysOfWeek,user):
		self.removeMedication(medicationName,user)
		self.addMedication(medicationName,dosage,time,daysOfWeek,user)

	def getMedications(self,user):
		instance = Medication.objects.all.filter(user=user)
		ret = []
		for medications in instance:
			ret.append(medications)
		return ret