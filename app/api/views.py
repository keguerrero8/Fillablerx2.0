from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Pharmacy, Pharmacist, Medication
from .serializers import PharmacySerializer, PharmacistSerializer, MedicationSerializer


def index(request):
    return HttpResponse("Welcome to home page!")


@api_view(["GET"])
def pharmacy_list(request):
    if request.method == "GET":
        pharmacies = Pharmacy.objects.all()
        serializer = PharmacySerializer(pharmacies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def pharmacy_detail(request, id):
    try:
        pharmacy = Pharmacy.objects.get(id=id)
    except Pharmacy.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = PharmacySerializer(pharmacy)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def medication_list(request):
    if request.method == "GET":
        medications = Medication.objects.all()
        serializer = MedicationSerializer(medications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
