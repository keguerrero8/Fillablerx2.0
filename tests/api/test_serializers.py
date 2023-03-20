import pytest
import factory

from api.serializers import RequestSerializer, PharmacySerializer


@pytest.mark.django_db
def test_request_serializer_validations(create_medication):
    data = {
        "phone_number": "+15169998888",
        "med_name": "Abacavir",
        "med_strength": "300mg",
        "quantity": 1,
        "bin_num": "123456",
        "pcn": "123",
        "rxgroup": "rxgroup",
        "isInsurance": True,
        "user_type": "patient",
    }

    serializer = RequestSerializer(data=data)

    assert serializer.is_valid()
    assert serializer.errors == {}
