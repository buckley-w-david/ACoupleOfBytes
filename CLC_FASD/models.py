# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class User(models.Model):
	uType = (('Participant','Participant'),('Staff','Staff'),('Admin','Admin'),('Family/Friends','Family/Friends'))

	username = models.CharField(max_length=50)
	password = models.CharField(max_length=50)
	firstname = models.CharField(max_length=50)
	lastname = models.CharField(max_length=50)
	email = models.EmailField()

	sessionKey = models.CharField(max_length=50, null=True)
	userType = models.CharField(max_length=11, choices=uType, default='Participant')
	connection = models.ManyToManyField("User")

class Medication(models.Model):
	daysOfWeek = ((1,'Monday'),(2,'Tuesday'),
		(3,'Wednesday'),(4,'Thursday'),
		(5,'Friday'),(6,'Saturday'),(0,'Sunday'))

	name = models.CharField(max_length=50)
	dosage = models.CharField(max_length=20, default="0mg")
	time = models.TimeField(blank=True, auto_now_add=False)
	day = models.IntegerField(choices=daysOfWeek)
	taken = models.BooleanField(default=False)

	medId = models.IntegerField()

	user = models.ForeignKey(User, on_delete=models.CASCADE)