from django.shortcuts import render
from django.http import HttpResponse

def index(request):
	return HttpResponse("Hello World. This is going to be the EMA")
	
# Create your views here.
