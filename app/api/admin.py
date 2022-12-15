from django.contrib import admin
from api.models import Pharmacist, Pharmacy, Request, Medication

admin.site.register(Pharmacist)
admin.site.register(Pharmacy)
admin.site.register(Medication)
admin.site.register(Request)
