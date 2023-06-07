from django.db import models
from django.contrib.postgres.fields import ArrayField
from phonenumber_field.modelfields import PhoneNumberField


class Pharmacy(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=300)
    zipcode = models.CharField(max_length=30)
    phone_number = PhoneNumberField()
    contact_name = models.CharField(max_length=200, blank=True)
    contact_title = models.CharField(max_length=200, blank=True)
    contact_email = models.CharField(max_length=200, blank=True)
    contact_phone_number = PhoneNumberField(blank=True, null=True)
    isDelivery = models.BooleanField(
        default=False
    )  # no validations for this since it will default to False, its only used for validating other fields as part of the enrollment form
    additional_language = models.CharField(max_length=200, blank=True)
    npi = models.CharField(max_length=200, blank=True)
    network = models.CharField(max_length=200, blank=True)
    initial_rate = models.CharField(max_length=200, blank=True)
    signature = models.CharField(max_length=300, blank=True)
    signed_agreement_admin = models.CharField(max_length=300, blank=True)
    signed_agreement_stamp = models.DateTimeField(
        auto_now=False, auto_now_add=False, blank=True, null=True
    )


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
    strength = ArrayField(
        models.CharField(max_length=100), default=strength_default, blank=True
    )
    isSpecialty = models.BooleanField(default=False)


class Request(models.Model):
    phone_number = PhoneNumberField()
    med_name = models.CharField(max_length=200, blank=True)
    med_strength = models.CharField(
        max_length=200,
        blank=True,
    )
    quantity = models.CharField(max_length=200)
    bin = models.CharField(max_length=200, blank=True)
    pcn = models.CharField(max_length=200, blank=True)
    rxgroup = models.CharField(max_length=200, blank=True)
    isInsurance = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    user_type = models.CharField(max_length=200)
    delivery_status = models.CharField(max_length=200, default="")
