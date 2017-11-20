# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
#from django.views.defaults import permission_denied, bad_request

from CLC_FASD import models
from CLC_FASD.APICalls import medication, account, verification

from django.utils.timezone import now, localtime

import json
import itertools


FORBIDDEN=403
BAD_REQUEST=400
OK=200

# Create your views here.
def index(request):
	return HttpResponse("Hello, world. You're at the CLC FASD index.")

@csrf_exempt
def login(request):
	if request.method == 'POST':
		try:
			creds = json.loads(request.body.decode('utf-8'))
			response = account.login(creds['username'], creds['password'])

			if response:
				return JsonResponse({"session_key": response})
			else:
				return JsonResponse({"error": "Invalid username or password"}, status=FORBIDDEN)
		except json.decoder.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON string"}, status=BAD_REQUEST) 
	else:
		return JsonResponse({"error": 'Expected POST request'}, status=BAD_REQUEST)

def logout(request):
	if request.method == 'GET':
		try:
			sessionKey = _session(request)
			id = account.getIdBySessionKey(sessionKey)

			if account.logout(id):
				return JsonResponse({}, status=OK)
			else:
				return JsonResponse({"error": 'Invalid Session Key'}, status=FORBIDDEN)
		except KeyError:
			return JsonResponse({"error": "Invalid Session Key"}, status=FORBIDDEN)
	else:
		return JsonResponse({"error": 'Expected GET request'}, status=BAD_REQUEST)

@csrf_exempt
def signup(request):
	if request.method == 'POST':
		try:
			account_info = json.loads(request.body.decode('utf-8'))
			username = account_info['username']
			password = account_info['password']
			firstname = account_info['firstname']
			lastname = account_info['lastname']
			email = account_info['email']

			if (account.signup(username, password, firstname, lastname, email)):
				return JsonResponse({}, status=OK)
			else:
				return JsonResponse({"error": "User with username={} already exists".format(username)}, status=BAD_REQUEST)
		except KeyError:
			return JsonResponse({"error": "Invalid account info"}, status=BAD_REQUEST)
		except json.decoder.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON string"}, status=BAD_REQUEST) 
	else:
		return JsonResponse({"error": 'Expected POST request'}, status=BAD_REQUEST)

def _combine(blobs):
	medictions = {"medications": []}
	for medId, medication_group in blobs:
		first = next(medication_group)
		# A given medication ID should have the same name and dosage for each entry
		med = {"id": medId, "name": first.name, "dosage": first.dosage, "times": ["{}:{}".format(first.day, first.time)]}
		for medication in medication_group:
			med["times"].append("{}:{}".format(medication.day, medication.time))
		medictions["medications"].append(med)
	return medictions

@csrf_exempt
def meds(request):
	print("meds")
	try:
		sessionKey = _session(request)
	except KeyError:
		return JsonResponse({"error": 'Invalid Session Key'}, status=FORBIDDEN)

	id = account.getIdBySessionKey(sessionKey)
	if (not id):
		return JsonResponse({"error": 'Invalid Session Key'}, status=FORBIDDEN)

	if request.method == 'GET':
		user_medications = medication.getMedications(id)
		grouped_meds = itertools.groupby(user_medications, key=lambda m: m.medId)
		return JsonResponse(_combine(grouped_meds))
	elif request.method == 'POST':
		medication_info = json.loads(request.body.decode('utf-8'))
		medId = medication.newMedId()
		name = medication_info['name']
		dosage = medication_info['dosage']

		for time in medication_info["times"]:
			day, hour, minute, second = time.split(':')
			medication.addMedication(name, dosage, '{}:{}:'.format(hour, minute, second), int(day), medId, id)
	else:
		return JsonResponse({"error": 'Expected one of [POST, GET] request'}, status=BAD_REQUEST)

	return JsonResponse({}, status=OK)

def _convert(rows):
	med = {"id": 0, "name": "", "dosage": "", "times": []}
	for instance in rows:
		med["id"] = instance.medId
		med["name"] = instance.name
		med["dosage"] = instance.dosage
		print(instance.day)
		med["times"].append("{}:{}".format(instance.day, instance.time))

	return med

@csrf_exempt
def med(request, medId):
	try:
		sessionKey = _session(request)
	except KeyError:
		return JsonResponse({"error": 'Invalid Session Key'}, status=FORBIDDEN)

	id = account.getIdBySessionKey(sessionKey)
	if (not id):
		return JsonResponse({"error": 'Invalid Session Key'}, status=FORBIDDEN)


	medId = int(medId)
	med = medication.getMedication(id, medId)
	if not med.exists():
		return JsonResponse({"error": 'Medication {} for {} not found'.format(medId, account.getUsernameById(id))}, status=BAD_REQUEST)

	if request.method == 'GET':
		return JsonResponse(_convert(med))

	elif request.method == 'PATCH':
		try:
			medication_info = json.loads(request.body.decode('utf-8'))
			instance = med[0]
			name, dosage = instance.name, instance.dosage
			med.delete() #delete existing medication entries matching the medId

			#create new ones with the new times
			for time in medication_info["times"]:
				day, hour, minute, second = time.split(':')
				medication.addMedication(name, dosage, '{}:{}:{}'.format(hour, minute, second), int(day), medId, id)

		except (KeyError, TypeError) as e:
			print(e)
			return JsonResponse({"error": "Bad request data"}, status=BAD_REQUEST)
		except json.decoder.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON string"}, status=BAD_REQUEST)

	elif request.method == 'DELETE':
		medication.removeMedication(medId, id)

	else:
		return JsonResponse({"error": 'Expected GET request'}, status=BAD_REQUEST)

	return JsonResponse({}, status=OK)

def due_meds(request):
	try:
		sessionKey = _session(request)
	except KeyError:
		return JsonResponse({"error": 'Invalid Session Key'}, status=FORBIDDEN)

	id = account.getIdBySessionKey(sessionKey)
	if (not id):
		return JsonResponse({"error": 'Invalid Session Key'}, status=FORBIDDEN)

	if request.method == 'GET':
		due_medications = medication.getPastDue(id)
		grouped_meds = itertools.groupby(due_medications, key=lambda m: m.medId)
		return JsonResponse(_combine(grouped_meds))
	else:
		return JsonResponse({"error": 'Expected GET request'}, status=BAD_REQUEST)

def next_meds(request):
	try:
		sessionKey = _session(request)
	except KeyError:
		return JsonResponse({"error": 'Invalid Session Key'}, status=FORBIDDEN)

	id = account.getIdBySessionKey(sessionKey)
	if (not id):
		return JsonResponse({"error": 'Invalid Session Key'}, status=FORBIDDEN)

	if request.method == 'GET':
		due = medication.getNextDue(id)
		return JsonResponse({"name": due.name, "dosage": due.dosage, "time": "{}:{}".format(due.day, due.time)})
	else:
		return JsonResponse({"error": 'Expected GET request'}, status=BAD_REQUEST)

@csrf_exempt
def take(request, medId):
	current = localtime(now())
	day = current.weekday()

	try:
		sessionKey = _session(request)
	except KeyError:
		return JsonResponse({"error": 'Invalid Session Key'}, status=FORBIDDEN)

	id = account.getIdBySessionKey(sessionKey)
	if (not id):
		return JsonResponse({"error": 'Invalid Session Key'}, status=FORBIDDEN)


	medId = int(medId)
	med = medication.getMedication(id, medId)
	if not med.exists():
		return JsonResponse({"error": 'Medication {} for {} not found'.format(medId, account.getUsernameById(id))}, status=BAD_REQUEST)

	if request.method == 'PATCH':
		match = med.filter(day = day, taken=False, time__lte = current.time()).order_by('-time')
		if match.exists():
			instance = match[0]
			instance.taken = True
			instance.save()
	else:
		return JsonResponse({"error": 'Expected GET request'}, status=BAD_REQUEST)

	return JsonResponse({}, status=OK)


def _session(request):
	return request.META['HTTP_SESSION_KEY']