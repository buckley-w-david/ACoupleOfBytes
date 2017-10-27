# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.utils.encoding import python_2_unicode__compatible
# Create your models here.

@python_2_unicode__compatible
class User(models.Model):
	uTypes = (('Client','Client'),('Staff','Staff'),('Admin','Admin'),('Friends/Family','Friends/Family'))
	username = models.CharField(max_length=20)
	password = models.CharField(max_length=100)
	userType = models.CharField(max_length=13, choices=uTypes)
	sessionKey = models.CharField(max_length=30)
	def __str__(self):
		return self.username+", "+self.userType

@python_2_unicode__compatible
class Medication(models.Model):
	medicationName=models.CharField(max_length=100)
	def __str__(self):
		return self.medicationName