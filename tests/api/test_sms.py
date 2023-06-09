import pytest
from api.sms import TwilioClient
from api.models import Request, Pharmacy


@pytest.mark.skip(reason="this is only used to test inbound sms to patient")
@pytest.mark.django_db
def test_inbound_to_patient():
    request_sms = Request(
        id=100,
        phone_number="+15167847791",
        med_name="Advil",
        med_strength="100mg",
        quantity="4",
    )
    request_sms.save()
    pharmacy = Pharmacy(
        phone_number="+15169998888",
        name="CVS",
        address="111-222 test road",
        zipcode="12345",
        isDelivery=True,
        additional_language="spanish",
    )
    pharmacy.save()
    client = TwilioClient()
    client.inbound_to_patient(request_sms, pharmacy)
    assert True
