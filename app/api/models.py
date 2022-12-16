from django.db import models
from django.contrib.postgres.fields import ArrayField
from phonenumber_field.modelfields import PhoneNumberField


class Pharmacy(models.Model):
    name = models.CharField(max_length=200, unique=True)
    address = models.CharField(max_length=300)
    zipcode = models.CharField(max_length=30)
    phone_number = PhoneNumberField()


class Pharmacist(models.Model):
    pharmacy = models.ForeignKey(Pharmacy, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    phone_number = PhoneNumberField()
    email = models.EmailField(max_length=200, blank=True, null=True)
    isEnrolled = models.BooleanField(default=False)


class Medication(models.Model):
    def strength_default():
        return []

    name = models.CharField(max_length=200)
    brand_name = models.CharField(max_length=200, blank=True)
    strength = ArrayField(models.CharField(max_length=100), default=strength_default)


class Request(models.Model):
    phone_number = PhoneNumberField()
    med_name = models.CharField(max_length=200)
    # TODO strength should only be required if the medname exists and its
    # corresponding strength arrays size is greater than 0
    med_strength = models.CharField(max_length=200)
    quantity = models.CharField(max_length=200)
    # TODO bin, pcn, rxgroup are only needed if insurance is true
    bin = models.CharField(max_length=200)
    pcn = models.CharField(max_length=200)
    rxgroup = models.CharField(max_length=200)
    isInsurance = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
