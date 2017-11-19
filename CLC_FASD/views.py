# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest, HttpResponseNotFound, HttpResponseForbidden
#from django.views.defaults import permission_denied, bad_request

from CLC_FASD import models
from CLC_FASD.APICalls import medication, account, verification

import json


FORBIDDEN=403
BAD_REQUEST=400
OK=200

# Create your views here.
def index(request):
	return HttpResponse("Hello, world. You're at the CLC FASD index.")

@csrf_exempt
def login(request):
	if request.method == 'POST':
		creds = json.loads(request.body.decode('utf-8'))
		response = account.login(creds['username'], creds['password'])

		if response:
			return JsonResponse({"session_key": response})
		else:
			return HttpResponse("Invalid username or password", status=FORBIDDEN)
	else:
		return HttpResponse('Expected POST request', status=BAD_REQUEST)

def logout(request):
	if request.method == 'GET':
		try:
			sessionKey = _session(request)
			id = account.getIdBySessionKey(sessionKey)

			if account.logout(id):
				return HttpResponse(status=OK)
			else:
				return HttpResponse('Invalid Session Key', status=FORBIDDEN)
		except KeyError:
			return HttpResponse("Invalid Session Key", status=FORBIDDEN)
	else:
		return HttpResponse('Expected GET request', status=BAD_REQUEST)

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
				return HttpResponse(status=OK)
			else:
				return HttpResponse("User with username={} already exists".format(username), status=BAD_REQUEST)
		except KeyError:
			return HttpResponse("Invalid account info", status=BAD_REQUEST)
	else:
		return HttpResponse('Expected POST request', status=BAD_REQUEST)

@csrf_exempt
def meds(request):
	return HttpResponse(status=501)

	try:
		sessionKey = _session(request)
	except KeyError:
		return HttpResponse('Invalid Session Key', status=FORBIDDEN)

	id = account.getIdBySessionKey(sessionKey)

	return HttpResponse(status=501)
	if request.method == 'GET':
		user_medications = medication.getMedications(id)
		#Combine entries for the same med into a single json blob with multiple times, id=medID
	elif request.method == 'POST':
		medication_info = json.loads(request.body.decode('utf-8'))
		medId = medication.newMedId()
		#split medication_info up into multiple entries, one for each time
		#call addMedication
	elif request.method == 'PATCH':
		medication_info = json.loads(request.body.decode('utf-8'))
		#call remove then add
	elif request.method == 'DELETE':
		medication_info = json.loads(request.body.decode('utf-8'))
		#call removeMedication
	else:
		return HttpResponse('Expected one of [POST, GET, PATCH, DELETE] request', status=BAD_REQUEST)

	return HttpResponse("meds Endpoint")

def due_meds(request):
	if request.method == 'GET':
		return HttpResponse(status=501)
	else:
		return HttpResponse('Expected GET request', status=BAD_REQUEST)

def next_meds(request):
	if request.method == 'GET':
		return HttpResponse(status=501)
	else:
		return HttpResponse('Expected GET request', status=BAD_REQUEST)

def _session(request):
	return request.META['HTTP_SESSION_KEY']