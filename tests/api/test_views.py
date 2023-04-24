import pytest
from django.test import Client

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
@pytest.mark.skip(
    reason="running this test will send an actual sms, skipping until we move to test credentials"
)
def test_post_request(create_medication, create_pharmacist):
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

    assert response.status_code == 201
    assert response.data["med_name"] == "Abacavir"


@pytest.mark.django_db
def test_post_request_invalid_data(create_medication, create_pharmacist):
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
    assert response.status_code == 400
    assert (
        response.data["errors"]["med_strength"][0]
        == "The medication name must be valid"
    )


@pytest.mark.django_db
@pytest.mark.skip(
    reason="running this test will send an actual sms, skipping until we move to test credentials"
)
def test_post_request_twilio_error(create_medication):
    """Test when there are no phone numbers to send sms to since there are no pharmacists present"""

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
    assert response.status_code == 500
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
        "contact_name": "test_name",
        "contact_title": "test_title",
        "contact_email": "test_email",
        "contact_phone_number": "+15169998888",
        "npi": "123",
        "signature": "",
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
        "contact_name": "",
        "contact_title": "test_title",
        "contact_email": "test_email",
        "contact_phone_number": "+15169998888",
        "npi": "123",
        "signature": "Test",
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
