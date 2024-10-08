import pytest
import datetime

from django.test import Client
from api.models import Request

client = Client()


@pytest.mark.django_db
def test_get_medications(create_medication):
    response = client.get("/api/medications")
    assert response.status_code == 200

    data = response.data

    assert data[0]["name"] == "Abacavir"
    assert data[1]["name"] == "Amoxicillin"


@pytest.mark.django_db
def test_get_requests():
    response = client.get("/api/requests")
    assert response.status_code == 405


# create medication to pass validation for med strength, create pharmacist to send out messages
@pytest.mark.twilio
@pytest.mark.django_db
def test_post_request(create_medication, create_pharmacist):
    """Verify that a request was created successfully and a twilio was successfully delivered"""
    request_payload = {
        "med_name": "Abacavir",
        "med_strength": ["300mg"],
        "quantity": "1",
        "bin": "",
        "pcn": "",
        "rxgroup": "",
        "isinsurance": False,
        "user_type": "patient",
        "phone_number": "+15167847791",
        "is_test": True,
    }

    response = client.post("/api/requests", request_payload)

    assert response.status_code == 201
    assert response.data["delivery_status"] == "success"
    assert response.data["med_name"] == "Abacavir"


@pytest.mark.django_db
def test_post_request_invalid_data(create_medication, create_pharmacist):
    """Verify that a request failed validation and was never saved to the database"""
    request_payload = {
        "med_name": "Abacavi",
        "med_strength": ["300mg"],
        "quantity": "1",
        "bin": "",
        "pcn": "",
        "rxgroup": "",
        "isinsurance": False,
        "user_type": "patient",
        "phone_number": "+15167847791",
    }

    response = client.post("/api/requests", request_payload)
    requests = Request.objects.all()

    assert response.status_code == 400
    assert len(requests) == 0
    assert (
        response.data["errors"]["med_strength"][0]
        == "The medication name must be a valid option from dropdown"
    )


@pytest.mark.django_db
def test_post_request_twilio_error(create_medication):
    """There are no phone numbers to send sms to since there are no pharmacists present.
    Verify that the request was saved to the database but the delivery status for twilio sms failed
    """

    request_payload = {
        "med_name": "Abacavir",
        "med_strength": ["300mg"],
        "quantity": "1",
        "bin": "",
        "pcn": "",
        "rxgroup": "",
        "isinsurance": False,
        "user_type": "patient",
        "phone_number": "+15167847791",
    }

    response = client.post("/api/requests", request_payload)
    request = Request.objects.all()[0]

    assert response.status_code == 500
    assert request.delivery_status == "fail"
    assert (
        response.data["errors"]
        == "Something went wrong when creating the request, please contact your administrator"
    )


@pytest.mark.django_db
def test_put_pharmacy(create_pharmacy, create_user):

    pharmacy_update_payload = {
        "contact_name": "test_name",
        "contact_title": "test_title",
        "contact_email": "test_email",
        "contact_phone_number": "+15169998888",
        "npi": "123",
        "network": "DME Limited (N/A)",
        "initial_rate": "50",
        "signature": "test_signature",
    }
    pharmacy = create_pharmacy
    client.force_login(create_user)
    response = client.put(
        f"/api/pharmacies/{pharmacy.id}",
        data=pharmacy_update_payload,
        content_type="application/json",
    )

    assert response.status_code == 200
    assert response.data["contact_name"] == "test_name"


@pytest.mark.django_db
def test_put_pharmacy_no_pharmacy(create_user):

    pharmacy_update_payload = {
        "contact_name": "test_name",
        "contact_title": "test_title",
        "contact_email": "test_email",
        "contact_phone_number": "+15169998888",
        "npi": "123",
        "network": "DME Limited (N/A)",
        "initial_rate": "50",
        "signature": "test_signature",
    }

    client.force_login(create_user)
    response = client.put(
        "/api/pharmacies/1",
        data=pharmacy_update_payload,
        content_type="application/json",
    )

    assert response.status_code == 404


@pytest.mark.django_db
def test_put_pharmacy_no_signature(create_pharmacy, create_user):

    pharmacy_update_payload = {
        "additional_language": "chinese",
        "contact_name": "test_name",
        "contact_title": "test_title",
        "contact_email": "test_email",
        "contact_phone_number": "+15169998888",
        "npi": "123",
        "network": "DME Limited (N/A)",
        "initial_rate": "50",
        "isDelivery": False,
        "signature": "",
        "signed_agreement_admin": "Kevin",
        "signed_agreement_stamp": datetime.datetime.now(),
    }
    pharmacy = create_pharmacy
    client.force_login(create_user)
    response = client.put(
        f"/api/pharmacies/{pharmacy.id}",
        data=pharmacy_update_payload,
        content_type="application/json",
    )

    assert response.status_code == 400
    assert response.data["signature"][0] == "A signature must be provided"


@pytest.mark.django_db
def test_put_pharmacy_invalid_data(create_pharmacy, create_user):

    pharmacy_update_payload = {
        "additional_language": "chinese",
        "contact_name": "",
        "contact_title": "test_title",
        "contact_email": "test_email",
        "contact_phone_number": "+15169998888",
        "npi": "123",
        "network": "DME Limited",
        "initial_rate": "50",
        "isDelivery": False,
        "signature": "Test",
        "signed_agreement_admin": "Kevin",
        "signed_agreement_stamp": datetime.datetime.now(),
    }
    pharmacy = create_pharmacy
    client.force_login(create_user)
    response = client.put(
        f"/api/pharmacies/{pharmacy.id}",
        data=pharmacy_update_payload,
        content_type="application/json",
    )

    assert response.status_code == 400
    assert response.data["contact_name"][0] == "A contact name must be provided"


@pytest.mark.django_db
def test_post_medication():
    pharmacy_payload = {
        "name": "test",
        "address": "test address",
        "zipcode": "11111",
        "phone_number": "+15167847791",
    }

    response = client.post("/api/pharmacies", pharmacy_payload)
    assert response.status_code == 403
