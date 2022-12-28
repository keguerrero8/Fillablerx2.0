from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

from .models import Pharmacy, Pharmacist, Medication, Request
from .serializers import (
    PharmacySerializer,
    PharmacistSerializer,
    MedicationSerializer,
    RequestSerializer,
    UserSerializer
)

# @api_view(["GET"])
@csrf_exempt
def get_user(request):
    
    import pdb; pdb.set_trace()
    if not request.user.is_authenticated:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    return Response(status=status.HTTP_200_OK)
    try:
        session_id = request.session["user_id"]
        user = User.objects.get(id=session_id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["DELETE"])
def logout_user(request):
    # import pdb; pdb.set_trace()
    logout(request)
    return HttpResponse("Successful logout!")
       
@api_view(["POST"])
def login_user(request):
    # import pdb; pdb.set_trace()
    body = json.loads(request.body)
    username = body['username']
    password = body['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        request.session["user_id"] = user.id
        serializer = UserSerializer(user)
        # import pdb; pdb.set_trace()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

# @csrf_exempt
# def login_user(request):
#     import pdb; pdb.set_trace()
#     username = request.POST['username']
#     password = request.POST['password']
#     user = authenticate(request, username=username, password=password)
#     if user is not None:
#         login(request, user)
#         request.session["user_id"] = user.id
#         serializer = UserSerializer(user)
#         import pdb; pdb.set_trace()
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     else:
#         return Response(status=status.HTTP_401_UNAUTHORIZED)


def index(request):
    return HttpResponse("Fillable API")


@api_view(["GET"])
def pharmacy_list(request):
    """
    Get all pharmacies
    """
    if request.method == "GET":
        pharmacies = Pharmacy.objects.all()
        serializer = PharmacySerializer(pharmacies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
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


# TODO remember to update the frontend to send the pharmacy id via them
@api_view(["GET"])
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
def pharmacist_create(request):
    """
    Create a pharmacist (which will accept a pharmacy field as input).
    """
    # Changes in the frontend need to happen to make this actually work, should we add 
    # clause to check for the pharmacy as well?
    if request.method == "POST":
        serializer = PharmacistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE"])
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
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def medication_list(request):
    """
    Get a list of all medications
    """
    if request.method == "GET":
        medications = Medication.objects.order_by("name")
        serializer = MedicationSerializer(medications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def request_list(request):
    """
    Create a request. Here we will need to also trigger the API call to twilio to send our mass sms
    """
    if request.method == "POST":
        serializer = RequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )
        
        
