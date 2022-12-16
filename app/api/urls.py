from django.urls import path
from api import views

urlpatterns = [
    path("medications", views.medication_list, name="medication_list"),
    path("pharmacies", views.pharmacy_list, name="pharmacy_list"),
    path("pharmacies/<str:id>/", views.pharmacy_detail, name="pharmacy_detail"),
    path("", views.index, name="index"),
]
