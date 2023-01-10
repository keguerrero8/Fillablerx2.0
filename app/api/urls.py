from django.urls import path
from api import views

urlpatterns = [
    path("", views.index, name="index"),
    path("medications", views.medication_list, name="medication-list"),
    path("pharmacies", views.pharmacy_list, name="pharmacy-list"),
    path("pharmacies/<str:id>/", views.pharmacy_detail, name="pharmacy-detail"),
    path(
        "pharmacies/<str:id>/pharmacists", views.pharmacist_list, name="pharmacist-list"
    ),
    path("pharmacists", views.pharmacist_create, name="pharmacist-create"),
    path(
        "pharmacists/<str:id>", views.pharmacist_detail, name="pharmacist-update-delete"
    ),
    path("requests", views.request_list, name="request-create"),
    path("inbound", views.inbound_patient, name="inbound-patient"),
]
