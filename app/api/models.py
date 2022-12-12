from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class Pharmacy(models.Model):
    name = models.CharField(max_length=200, unique=True)
    address = models.CharField(max_length=300)
    zipcode = models.CharField(max_length=20)
    phone_number = PhoneNumberField(blank=True)
    
    
class Pharmacist(models.Model):
    pharmacy_name = models.ForeignKey(Pharmacy, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    phone_number = PhoneNumberField(blank=True)
    email = models.EmailField(max_length=200)
    isEnrolled = models.BooleanField(default=False)
