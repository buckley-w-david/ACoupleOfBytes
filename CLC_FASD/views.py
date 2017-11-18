# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render

from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest, HttpResponseNotFound, HttpResponseForbidden
#from django.views.defaults import permission_denied, bad_request

from CLC_FASD import models
from CLC_FASD.APICalls import medication, account, verification

import json


# Create your views here.
def index(request):
	return HttpResponse("Hello, world. You're at the CLC FASD index.")

def login(request):
	if request.method == 'POST':
		creds = json.loads(request.body)
		response = loginFunctions.login(creds['username'], creds['password'])
		if response:
			return JsonResponse({"session_key": response})
		else:
			return HttpResponseForbidden("Bad username or password")
	else:
		return HttpResponseBadRequest('Expected POST request')

def logout(request):
	if request.method == 'GET':
		try:
			session = _session(request)
			response = loginFunctions.logout(session)
			if response:
				return HttpResponse()
			else:
				return HttpResponseForbidden('Invalid Session Key')

		except KeyError:
			return HttpResponseForbidden("No session key")
	else:
		return HttpResponseBadRequest('Expected GET request')

def signup(request):
	if request.method == 'POST':
		return HttpResponse(status=501)
	else:
		return HttpResponseBadRequest('Expected POST request')

def meds(request):
	return HttpResponse(status=501)

	try:
		session = _session(request)
	except KeyError:
		return HttpResponseForbidden("No session key")

	if not verification.validSession("test"):
		return HttpResponseForbidden("Invalid session key")

	return HttpResponse(status=501)
	if request.method == 'GET':
		pass
	elif request.method == 'POST':
		pass
	elif request.method == 'PATCH':
		pass
	elif request.method == 'DELETE':
		pass
	else:
		return HttpResponseBadRequest('Expected one of [POST, GET, PATCH, DELETE] request')

	return HttpResponse("meds Endpoint")

def due_meds(request):
	if request.method == 'GET':
		return HttpResponse(status=501)
	else:
		return HttpResponseBadRequest('Expected GET request')

	return HttpResponse("Due Endpoint")

def next_meds(request):
	if request.method == 'GET':
		return HttpResponse(status=501)
	else:
		return HttpResponseBadRequest('Expected GET request')

	return HttpResponse("Next Endpoint")

def _session(request):
	return request.META['SESSION_KEY']