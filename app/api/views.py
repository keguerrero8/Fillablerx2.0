from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    my_dict = {'insert_me': "Hello I am from views.py!", 'greeting': "yo whats up"}
    return render(request, 'api/index.html', context=my_dict)

def home(request):
    return HttpResponse("Welcome to home page!")

def pharmacies(request):
    return HttpResponse("Welcome to Pharmacies page!")

def show_pharmacy(request, id):
    return HttpResponse("This is pharmacy with id: %s." % id)

def even_or_odd(request, num):
    return HttpResponse("This is your number in string %s" %num)
