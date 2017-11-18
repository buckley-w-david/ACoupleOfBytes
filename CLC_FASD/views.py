# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from CLC_FASD import models


def index(request):
	test = MedicationCalls()
	test.addMedication("adderall","10mg","10:00","Friday")
	#test.removeMedication("","")
	test.removeMedication("adderall","10mg")
	#test.getMedications()
	return HttpResponse("Hello, world. You're at the CLC FASD index.")


class MedicationCalls():
	def __init__(self):
		self.medicationName=""
		self.time=0
		self.daysOfWeek=""
		self.user=""

	def addMedication(self,medicationName,dosage,time,daysOfWeek):
		medication = models.Medication()
		medication.name= medicationName
		medication.dosage = dosage
		medication.time = time
		medication.day = daysOfWeek
		medication.save()

	def removeMedication(self,medicationName,dosage):
		instance = models.Medication.objects.get(name=medicationName, dosage=dosage)
		instance.delete()

	def editMedication(self,medicationName,dosage,time,daysOfWeek):
		self.removeMedication(medicationName,user)
		self.addMedication(medicationName,dosage,time,daysOfWeek)

	def getMedications(self,user):
		instance = models.Medication.objects.all()
		ret = []
		for medications in instance:
			ret.append(medications)
		return ret