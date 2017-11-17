# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Users(models.Model):
	uType = (('Participant','Participant'),('Staff','Staff'),('Admin','Admin'),('Family/Friends','Family/Friends'))
	username = models.CharField(max_length=50)
	password = models.CharField(max_length=50)
	sessionKey = models.CharField(max_length=50)
	userType = models.CharField(max_length=10,choices=uType,default='Participant')
	medication = models.ManyToManyField("Medication")
	connection = models.ManyToManyField("Connections")

class Medication(models.Model):
	daysOfWeek=(('Monday','Monday'),('Tuesday','Tuesday'), \
		('Wednesday','Wednesday'),('Thursday','Thursday'), \
		('Friday','Friday'),('Saturday','Saturday'),('Sunday','Sunday'))
	name = models.CharField(max_length=50)
	time = models.TimeField(blank=True,auto_now_add=False)
	day = models.CharField(max_length=10,choices=daysOfWeek)
	#user = models.ForeignKey(Users,related_name='b')

class Connections(models.Model):
	username = models.CharField(max_length=50)
	#connection = models.ForeignKey(Users,related_name='a')