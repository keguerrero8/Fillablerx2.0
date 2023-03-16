from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly,
    IsAuthenticated,
    AllowAny,
)
from rest_framework.response import Response
from django_twilio.decorators import twilio_view
from django_twilio.request import decompose

from .models import Pharmacy, Pharmacist, Medication, Request
from .serializers import (
    PharmacySerializer,
    PharmacistSerializer,
    MedicationSerializer,
    RequestSerializer,
)
from .sms import TwilioClient

import logging

logger = logging.getLogger(__name__)


@api_view(["GET"])
@csrf_protect
@permission_classes([IsAuthenticated])
def pharmacy_list(request):
    """
    Get all pharmacies
    """
    if request.method == "GET":
        pharmacies = Pharmacy.objects.order_by("name")
        serializer = PharmacySerializer(pharmacies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@csrf_protect
@permission_classes([IsAuthenticated])
def pharmacy_detail(request, id):
    """
    Get a single pharmacies details
    """
    try:
        pharmacy = Pharmacy.objects.get(id=id)
    except Pharmacy.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = PharmacySerializer(pharmacy)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@csrf_protect
@permission_classes([IsAuthenticated])
def pharmacist_list(request, id):
    """
    Get all pharmacists based on a particular pharmacy
    """
    try:
        pharmacy = Pharmacy.objects.get(id=id)
    except Pharmacy.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        pharmacists = pharmacy.pharmacist_set.all()
        serializer = PharmacistSerializer(pharmacists, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@csrf_protect
def pharmacist_create(request):
    """
    Create a pharmacist (which will accept a pharmacy field as input).
    """
    try:
        Pharmacy.objects.get(id=int(request.data["pharmacy"]))
    except Pharmacy.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "POST":
        serializer = PharmacistSerializer(data=request.data)
        if serializer.is_valid():
            pharmacist = serializer.save()
            try:
                TwilioClient().enroll_pharmacist_text(pharmacist)
            except:
                logging.debug(f"something went wrong with enroll pharmacist text")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE"])
@csrf_protect
@permission_classes([IsAuthenticated])
def pharmacist_detail(request, id):
    """
    Update or delete a pharmacist
    """
    try:
        pharmacist = Pharmacist.objects.get(id=id)
    except Pharmacist.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT":
        serializer = PharmacistSerializer(pharmacist, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        pharmacist.delete()
        return Response({"success": True}, status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
@csrf_protect
@permission_classes([IsAuthenticatedOrReadOnly])
def medication_list(request):
    """
    Get a list of all medications
    """
    if request.method == "GET":
        medications = Medication.objects.order_by("name")
        serializer = MedicationSerializer(medications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_protect
def request_list(request):
    """
    Create a request. Here we will need to also trigger the API call to twilio to send our mass sms
    """
    if request.method == "POST":
        try:
            serializer = RequestSerializer(data=request.data)
            if serializer.is_valid():
                request_sms = serializer.save()
                TwilioClient().send_mass_text(request_sms, Pharmacist)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(
                {"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
            )
        except:
            return Response(
                {
                    "error": "Something went wrong when creating the request, please contact your administrator"
                }
            )


@twilio_view
@csrf_exempt
def inbound_patient(request):
    twilio_request = decompose(request)
    origin_request = Request.objects.get(id=int(twilio_request.body))
    pharmacy = Pharmacist.objects.get(phone_number=twilio_request.from_).pharmacy
    TwilioClient().inbound_to_patient(origin_request, pharmacy)
    return HttpResponse("Inbound message successfully sent!")
