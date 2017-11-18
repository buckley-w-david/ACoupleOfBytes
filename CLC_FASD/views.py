# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render

from django.http import HttpResponse
from CLC_FASD import models
from django.utils.timezone import now, localtime

# Create your views here.

def index(request):
#	user = models.Users()
#	user.name="asd"
#	user.password="123"
#	user.sessionKey="abcdefg"
#	user.userType="Participant"
#	user.save()
#	addMedication("adderall","10mg","10:00","Friday","abcdefg")
#	removeMedication("adderall","10mg","abcdefg")

	return HttpResponse("Hello, world. You're at the CLC FASD index.")

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
		if(!(medication.taken) && medication.time<=time):
			yield medication


