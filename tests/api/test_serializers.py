import pytest
import factory
import csv
import datetime

from api.models import Medication
from api.serializers import RequestSerializer, PharmacySerializer, PharmacistSerializer


request_validations = [
    pytest.param(
        "med_name",
        [
            {
                "phone_number": "+15169998888",
                "med_name": "",
                "med_strength": "300mg",
                "quantity": "1",
                "bin": "123456",
                "pcn": "CVS",
                "rxgroup": "rxgroup",
                "isInsurance": True,
                "user_type": "patient",
            }
        ],
        "must be a valid medication from the dropdown options",
        id="medication_name_empty",
    ),
    pytest.param(
        "med_strength",
        [
            {
                "phone_number": "+15169998888",
                "med_name": "Abacavir",
                "med_strength": "",
                "quantity": "1",
                "bin": "123456",
                "pcn": "CVS",
                "rxgroup": "rxgroup",
                "isInsurance": True,
                "user_type": "patient",
            }
        ],
        "Please provide a medication strength from the dropdown",
        id="medication_strength_empty",
    ),
    pytest.param(
        "med_strength",
        [
            {
                "phone_number": "+15169998888",
                "med_name": "Abacavi",
                "med_strength": "300mg",
                "quantity": "1",
                "bin": "123456",
                "pcn": "CVS",
                "rxgroup": "rxgroup",
                "isInsurance": True,
                "user_type": "patient",
            }
        ],
        "The medication name must be a valid option from dropdown",
        id="medication_strength_with_name_invalid",
    ),
    pytest.param(
        "med_strength",
        [
            {
                "phone_number": "+15169998888",
                "med_name": "Abacavir",
                "med_strength": "30mg",
                "quantity": "1",
                "bin": "123456",
                "pcn": "CVS",
                "rxgroup": "rxgroup",
                "isInsurance": True,
                "user_type": "patient",
            }
        ],
        "Please select a valid medication strength from the dropdown",
        id="medication_strength_for_med_name_invalid",
    ),
    pytest.param(
        "quantity",
        [
            {
                "phone_number": "+15169998888",
                "med_name": "Abacavir",
                "med_strength": "300mg",
                "quantity": "p",
                "bin": "123456",
                "pcn": "CVS",
                "rxgroup": "rxgroup",
                "isInsurance": True,
                "user_type": "patient",
            }
        ],
        "must be a valid number",
        id="quantity_number_validation",
    ),
    pytest.param(
        "phone_number",
        [
            {
                "phone_number": "+15999998888",
                "med_name": "Abacavir",
                "med_strength": "300mg",
                "quantity": "1",
                "bin": "123456",
                "pcn": "CVS",
                "rxgroup": "rxgroup",
                "isInsurance": True,
                "user_type": "patient",
            }
        ],
        "The phone number entered is not valid.",
        id="phone_number_validation",
    ),
    pytest.param(
        "bin",
        [
            {
                "phone_number": "+15169998888",
                "med_name": "Abacavir",
                "med_strength": "300mg",
                "quantity": "1",
                "bin": "",
                "pcn": "CVS",
                "rxgroup": "rxgroup",
                "isInsurance": True,
                "user_type": "patient",
            }
        ],
        "Please provide a valid BIN",
        id="bin_empty",
    ),
    pytest.param(
        "bin",
        [
            {
                "phone_number": "+15169998888",
                "med_name": "Abacavir",
                "med_strength": "300mg",
                "quantity": "1",
                "bin": "1234p",
                "pcn": "CVS",
                "rxgroup": "rxgroup",
                "isInsurance": True,
                "user_type": "patient",
            }
        ],
        "A valid BIN should be 6 digits",
        id="bin_six_digit_validation",
    ),
    pytest.param(
        "pcn",
        [
            {
                "phone_number": "+15169998888",
                "med_name": "Abacavir",
                "med_strength": "300mg",
                "quantity": "1",
                "bin": "12334p",
                "pcn": "",
                "rxgroup": "rxgroup",
                "isInsurance": True,
                "user_type": "patient",
            }
        ],
        "Please provide a valid PCN",
        id="pcn_empty",
    ),
    pytest.param(
        "rxgroup",
        [
            {
                "phone_number": "+15169998888",
                "med_name": "Abacavir",
                "med_strength": "300mg",
                "quantity": "1",
                "bin": "12334p",
                "pcn": "CVS",
                "rxgroup": "",
                "isInsurance": True,
                "user_type": "patient",
            }
        ],
        "Please provide a valid RxGroup",
        id="rxgroup_empty",
    ),
    pytest.param(
        "user_type",
        [
            {
                "phone_number": "+15169998888",
                "med_name": "Abacavir",
                "med_strength": "300mg",
                "quantity": "1",
                "bin": "12334p",
                "pcn": "CVS",
                "rxgroup": "rxgroup",
                "isInsurance": True,
                "user_type": "test",
            }
        ],
        "User type must be either patient or health care provider",
        id="user_type_invalid",
    ),
]


@pytest.mark.parametrize(
    "invalid_param, data, expected_error_message", request_validations
)
@pytest.mark.django_db
def test_request_serializer_validations(
    invalid_param, data, expected_error_message, create_medication
):
    request_data = {
        "phone_number": data[0]["phone_number"],
        "med_name": data[0]["med_name"],
        "med_strength": data[0]["med_strength"],
        "quantity": data[0]["quantity"],
        "bin": data[0]["bin"],
        "pcn": data[0]["pcn"],
        "rxgroup": data[0]["rxgroup"],
        "isInsurance": data[0]["isInsurance"],
        "user_type": data[0]["user_type"],
    }

    serializer = RequestSerializer(data=request_data)

    assert serializer.is_valid() == False
    assert serializer.errors[invalid_param][0] == expected_error_message


pharmacy_validations = [
    pytest.param(
        "name",
        [
            {
                "phone_number": "+15169998888",
                "name": "",
                "address": "111-222 test road",
                "zipcode": "11580",
            }
        ],
        "This field may not be blank.",
        id="name_empty",
    ),
    pytest.param(
        "address",
        [
            {
                "phone_number": "+15169998888",
                "name": "CVS",
                "address": "",
                "zipcode": "11580",
            }
        ],
        "This field may not be blank.",
        id="address_empty",
    ),
    pytest.param(
        "zipcode",
        [
            {
                "phone_number": "+15169998888",
                "name": "CVS",
                "address": "111-222 test road",
                "zipcode": "",
            }
        ],
        "This field may not be blank.",
        id="zipcode_empty",
    ),
    pytest.param(
        "zipcode",
        [
            {
                "phone_number": "+15169998888",
                "name": "CVS",
                "address": "111-222 test road",
                "zipcode": "1234",
            }
        ],
        "A valid zipcode must be 5 digits",
        id="zipcode_five_digit_length_validation",
    ),
    pytest.param(
        "zipcode",
        [
            {
                "phone_number": "+15169998888",
                "name": "CVS",
                "address": "111-222 test road",
                "zipcode": "1234p",
            }
        ],
        "A valid zipcode must be 5 digits",
        id="zipcode_five_digit_numerical_validation",
    ),
    pytest.param(
        "phone_number",
        [
            {
                "phone_number": "+1516999888",
                "name": "CVS",
                "address": "111-222 test road",
                "zipcode": "11580",
            }
        ],
        "The phone number entered is not valid.",
        id="phone_number_validation",
    ),
]


@pytest.mark.parametrize(
    "invalid_param, data, expected_error_message", pharmacy_validations
)
def test_pharmacy_serializer_validations(invalid_param, data, expected_error_message):
    pharmacy_data = {
        "phone_number": data[0]["phone_number"],
        "name": data[0]["name"],
        "address": data[0]["address"],
        "zipcode": data[0]["zipcode"],
    }

    serializer = PharmacySerializer(data=pharmacy_data)

    assert serializer.is_valid() == False
    assert serializer.errors[invalid_param][0] == expected_error_message


pharmacy_enrollment_validations = [
    pytest.param(
        "npi",
        [
            {
                "npi": "",
                "contact_name": "John",
                "contact_title": "Pharmacist",
                "contact_email": "johndoe@gmail.com",
                "contact_phone_number": "+15161234567",
                "network": "Local Community",
                "initial_rate": "30",
                "signature": "John Doe",
                "signed_agreement_admin": "Kevin",
                "signed_agreement_stamp": datetime.datetime.now(),
            }
        ],
        "A valid npi must be provided",
        id="npi_empty",
    ),
    pytest.param(
        "npi",
        [
            {
                "npi": "test",
                "contact_name": "John",
                "contact_title": "Pharmacist",
                "contact_email": "johndoe@gmail.com",
                "contact_phone_number": "+15161234567",
                "network": "Local Community",
                "initial_rate": "30",
                "signature": "John Doe",
                "signed_agreement_admin": "Kevin",
                "signed_agreement_stamp": datetime.datetime.now(),
            }
        ],
        "A valid npi must be numerical",
        id="npi_not_number",
    ),
    pytest.param(
        "contact_name",
        [
            {
                "npi": "123456",
                "contact_name": "",
                "contact_title": "Pharmacist",
                "contact_email": "johndoe@gmail.com",
                "contact_phone_number": "+15161234567",
                "network": "Local Community",
                "initial_rate": "30",
                "signature": "John Doe",
                "signed_agreement_admin": "Kevin",
                "signed_agreement_stamp": datetime.datetime.now(),
            }
        ],
        "A contact name must be provided",
        id="contact_name_empty",
    ),
    pytest.param(
        "contact_title",
        [
            {
                "npi": "123456",
                "contact_name": "John",
                "contact_title": "",
                "contact_email": "johndoe@gmail.com",
                "contact_phone_number": "+15161234567",
                "network": "Local Community",
                "initial_rate": "30",
                "signature": "John Doe",
                "signed_agreement_admin": "Kevin",
                "signed_agreement_stamp": datetime.datetime.now(),
            }
        ],
        "A contact title must be provided",
        id="contact_title_empty",
    ),
    pytest.param(
        "contact_email",
        [
            {
                "npi": "123456",
                "contact_name": "John",
                "contact_title": "Pharmacist",
                "contact_email": "",
                "contact_phone_number": "+15161234567",
                "network": "Local Community",
                "initial_rate": "30",
                "signature": "John Doe",
                "signed_agreement_admin": "Kevin",
                "signed_agreement_stamp": datetime.datetime.now(),
            }
        ],
        "A contact email must be provided",
        id="contact_email_empty",
    ),
    pytest.param(
        "contact_phone_number",
        [
            {
                "npi": "123456",
                "contact_name": "John",
                "contact_title": "Pharmacist",
                "contact_email": "johndoe@gmail.com",
                "contact_phone_number": "+1777777777",
                "network": "Local Community",
                "initial_rate": "30",
                "signature": "John Doe",
                "signed_agreement_admin": "Kevin",
                "signed_agreement_stamp": datetime.datetime.now(),
            }
        ],
        "The phone number entered is not valid.",
        id="contact_phone_number_invalid",
    ),
    pytest.param(
        "network",
        [
            {
                "npi": "123456",
                "contact_name": "John",
                "contact_title": "Pharmacist",
                "contact_email": "johndoe@gmail.com",
                "contact_phone_number": "+15161234567",
                "network": "",
                "initial_rate": "30",
                "signature": "John Doe",
                "signed_agreement_admin": "Kevin",
                "signed_agreement_stamp": datetime.datetime.now(),
            }
        ],
        "A Network must be provided",
        id="network_empty",
    ),
    pytest.param(
        "initial_rate",
        [
            {
                "npi": "123456",
                "contact_name": "John",
                "contact_title": "Pharmacist",
                "contact_email": "johndoe@gmail.com",
                "contact_phone_number": "+15161234567",
                "network": "Local Community",
                "initial_rate": "",
                "signature": "John Doe",
                "signed_agreement_admin": "Kevin",
                "signed_agreement_stamp": datetime.datetime.now(),
            }
        ],
        "An initial rate must be provided",
        id="initial_rate_empty",
    ),
    pytest.param(
        "initial_rate",
        [
            {
                "npi": "123456",
                "contact_name": "John",
                "contact_title": "Pharmacist",
                "contact_email": "johndoe@gmail.com",
                "contact_phone_number": "+15161234567",
                "network": "Local Community",
                "initial_rate": "five",
                "signature": "John Doe",
                "signed_agreement_admin": "Kevin",
                "signed_agreement_stamp": datetime.datetime.now(),
            }
        ],
        "must be a number",
        id="initial_rate_not_number",
    ),
    pytest.param(
        "signature",
        [
            {
                "npi": "123456",
                "contact_name": "John",
                "contact_title": "Pharmacist",
                "contact_email": "johndoe@gmail.com",
                "contact_phone_number": "+15161234567",
                "network": "Local Community",
                "initial_rate": "30",
                "signature": "",
                "signed_agreement_admin": "Kevin",
                "signed_agreement_stamp": datetime.datetime.now(),
            }
        ],
        "A signature must be provided",
        id="signature_empty",
    ),
    pytest.param(
        "signed_agreement_admin",
        [
            {
                "npi": "123456",
                "contact_name": "John",
                "contact_title": "Pharmacist",
                "contact_email": "johndoe@gmail.com",
                "contact_phone_number": "+15161234567",
                "network": "Local Community",
                "initial_rate": "30",
                "signature": "John Doe",
                "signed_agreement_admin": "",
                "signed_agreement_stamp": datetime.datetime.now(),
            }
        ],
        "A signed admin must be provided",
        id="signed_agreement_admin_empty",
    ),
]


@pytest.mark.parametrize(
    "invalid_param, data, expected_error_message", pharmacy_enrollment_validations
)
def test_pharmacy_enrollment_serializer_validations(
    invalid_param, data, expected_error_message
):
    pharmacy_enrollment_data = {
        "npi": data[0]["npi"],
        "contact_name": data[0]["contact_name"],
        "contact_title": data[0]["contact_title"],
        "contact_email": data[0]["contact_email"],
        "contact_phone_number": data[0]["contact_phone_number"],
        "network": data[0]["network"],
        "initial_rate": data[0]["initial_rate"],
        "signature": data[0]["signature"],
        "signed_agreement_admin": data[0]["signed_agreement_admin"],
        "signed_agreement_stamp": data[0]["signed_agreement_stamp"],
    }

    serializer = PharmacySerializer(data=pharmacy_enrollment_data, partial=True)

    assert serializer.is_valid() == False
    assert serializer.errors[invalid_param][0] == expected_error_message


def test_is_field_required_enrollment():
    pharmacy_enrollment_data = {
        "npi": "123",
        "contact_name": "John",
        "contact_title": "Pharmacy",
        "contact_email": "johndoe@gmail.com",
        "contact_phone_number": "+15167771234",
        "network": "Local Community",
        "initial_rate": "30",
        "signature": "John Doe",
        "signed_agreement_admin": "Kevin",
        "signed_agreement_stamp": datetime.datetime.now(),
    }

    serializer = PharmacySerializer(data=pharmacy_enrollment_data, partial=True)

    assert serializer.is_valid() == True
    assert serializer.is_field_required_enrollment() == True


pharmacist_validations = [
    pytest.param(
        "name",
        [{"phone_number": "+15169998888", "name": "", "pharmacy": "1"}],
        "This field may not be blank.",
        id="name_empty",
    ),
    pytest.param(
        "phone_number",
        [{"phone_number": "+1516999888", "name": "Kevin", "pharmacy": "2"}],
        "The phone number entered is not valid.",
        id="phone_number_validation",
    ),
    pytest.param(
        "pharmacy",
        [{"phone_number": "+15169998888", "name": "Kevin", "pharmacy": "2"}],
        'Invalid pk "2" - object does not exist.',
        id="pharmacy_does_not_exist",
    ),
]


@pytest.mark.parametrize(
    "invalid_param, data, expected_error_message", pharmacist_validations
)
@pytest.mark.django_db
def test_pharmacist_serializer_validations(
    invalid_param, data, expected_error_message, create_pharmacy
):
    pharmacist_data = {
        "phone_number": data[0]["phone_number"],
        "name": data[0]["name"],
        "pharmacy": data[0]["pharmacy"],
    }

    serializer = PharmacistSerializer(data=pharmacist_data)

    assert serializer.is_valid() == False
    assert serializer.errors[invalid_param][0] == expected_error_message
