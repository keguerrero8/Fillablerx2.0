import pytest
import factory
import datetime

from api.serializers import RequestSerializer, PharmacySerializer, PharmacistSerializer


request_validations = [
    pytest.param(
        "med_name",
        "",
        "must be a valid medication from the dropdown options",
        id="medication_name_empty",
    ),
    pytest.param(
        "med_strength",
        "",
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
        marks=pytest.mark.skip(reason="FIXME - hard to test since we use the key name to find the error but in this case issue is med_name"),
        id="medication_strength_with_name_invalid",
    ),
    pytest.param(
        "med_strength",
        "30mg",
        "Please select a valid medication strength from the dropdown",
        id="medication_strength_for_med_name_invalid",
    ),
    pytest.param(
        "quantity",
        "p",
        "must be a valid number",
        id="quantity_number_validation",
    ),
    pytest.param(
        "phone_number",
        "+15999998888",
        "The phone number entered is not valid.",
        id="phone_number_validation",
    ),
    pytest.param(
        "bin",
        "",
        "Please provide a valid BIN",
        id="bin_empty",
    ),
    pytest.param(
        "bin",
        "1234p",
        "A valid BIN should be 6 digits",
        id="bin_six_digit_validation",
    ),
    pytest.param(
        "pcn",
        "",
        "Please provide a valid PCN",
        id="pcn_empty",
    ),
    pytest.param(
        "rxgroup",
        "",
        "Please provide a valid RxGroup",
        id="rxgroup_empty",
    ),
    pytest.param(
        "user_type",
        "test",
        "User type must be either patient or health care provider",
        id="user_type_invalid",
    ),
]


@pytest.mark.parametrize(
    "invalid_param, invalid_value, expected_error_message", request_validations
)
@pytest.mark.django_db
def test_request_serializer_validations(
    invalid_param, invalid_value, expected_error_message, create_medication
):
    request_data = {
        "phone_number": "+15169998888",
        "med_name": "Abacavir",
        "med_strength": "300mg",
        "quantity": "1",
        "bin": "12334p",
        "pcn": "CVS",
        "rxgroup": "rxgroup",
        "isInsurance": True,
        "user_type": "patient",
    }
    request_data[invalid_param]= invalid_value
    serializer = RequestSerializer(data=request_data)

    assert serializer.is_valid() == False
    assert serializer.errors[invalid_param][0] == expected_error_message


pharmacy_validations = [
    pytest.param(
        "name",
        "",
        "This field may not be blank.",
        id="name_empty",
    ),
    pytest.param(
        "address",
        "",
        "This field may not be blank.",
        id="address_empty",
    ),
    pytest.param(
        "zipcode",
        "",
        "This field may not be blank.",
        id="zipcode_empty",
    ),
    pytest.param(
        "zipcode",
        "1234",
        "A valid zipcode must be 5 digits",
        id="zipcode_five_digit_length_validation",
    ),
    pytest.param(
        "zipcode",
        "1234p",
        "A valid zipcode must be 5 digits",
        id="zipcode_five_digit_numerical_validation",
    ),
    pytest.param(
        "phone_number",
        "+1516999888",
        "The phone number entered is not valid.",
        id="phone_number_validation",
    ),
]


@pytest.mark.parametrize(
    "invalid_param, invalid_value, expected_error_message", pharmacy_validations
)
def test_pharmacy_serializer_validations(invalid_param, invalid_value, expected_error_message):
    pharmacy_data = {
        "phone_number": "+15169998888",
        "name": "CVS",
        "address": "111-222 test road",
        "zipcode": "12345",
    }
    pharmacy_data[invalid_param] = invalid_value
    serializer = PharmacySerializer(data=pharmacy_data)

    assert serializer.is_valid() == False
    assert serializer.errors[invalid_param][0] == expected_error_message


pharmacy_enrollment_validations = [
    pytest.param(
        "npi",
        "",
        "A valid npi must be provided",
        id="npi_empty",
    ),
    pytest.param(
        "npi",
        "test",
        "A valid npi must be numerical",
        id="npi_not_number",
    ),
    pytest.param(
        "contact_name",
        "",
        "A contact name must be provided",
        id="contact_name_empty",
    ),
    pytest.param(
        "contact_title",
        "",
        "A contact title must be provided",
        id="contact_title_empty",
    ),
    pytest.param(
        "contact_email",
        "",
        "A contact email must be provided",
        id="contact_email_empty",
    ),
    pytest.param(
        "contact_phone_number",
        "+1777777777",
        "The phone number entered is not valid.",
        id="contact_phone_number_invalid",
    ),
    pytest.param(
        "network",
        "",
        "A Network must be provided",
        id="network_empty",
    ),
    pytest.param(
        "initial_rate",
        "",
        "An initial rate must be provided",
        id="initial_rate_empty",
    ),
    pytest.param(
        "initial_rate",
        "five",
        "must be a number",
        id="initial_rate_not_number",
    ),
    pytest.param(
        "signature",
        "",
        "A signature must be provided",
        id="signature_empty",
    ),
    pytest.param(
        "signed_agreement_admin",
        "",
        "A signed admin must be provided",
        id="signed_agreement_admin_empty",
    ),
]


@pytest.mark.parametrize(
    "invalid_param, invalid_value, expected_error_message", pharmacy_enrollment_validations
)
def test_pharmacy_enrollment_serializer_validations(
    invalid_param, invalid_value, expected_error_message
):
    pharmacy_enrollment_data = {
        "additional_language": "chinese",
        "npi": "123456",
        "contact_name": "John",
        "contact_title": "Pharmacist",
        "contact_email": "johndoe@gmail.com",
        "contact_phone_number": "+15161234567",
        "network": "Local Community",
        "initial_rate": "30",
        "isDelivery": False,
        "signature": "John Doe",
        "signed_agreement_admin": "Kevin",
        "signed_agreement_stamp": datetime.datetime.now(),
    }
    pharmacy_enrollment_data[invalid_param] = invalid_value
    serializer = PharmacySerializer(data=pharmacy_enrollment_data, partial=True)

    assert serializer.is_valid() == False
    assert serializer.errors[invalid_param][0] == expected_error_message
    
    
def test_pharmacy_additional_language():
    pharmacy_enrollment_data = {
        "additional_language": "english",
        "npi": "123",
        "contact_name": "John",
        "contact_title": "Pharmacy",
        "contact_email": "johndoe@gmail.com",
        "contact_phone_number": "+15167771234",
        "network": "Local Community",
        "initial_rate": "30",
        "isDelivery": False,
        "signature": "John Doe",
        "signed_agreement_admin": "Kevin",
        "signed_agreement_stamp": datetime.datetime.now()
    }

    serializer = PharmacySerializer(data=pharmacy_enrollment_data, partial=True)

    assert serializer.is_valid() == False
    assert serializer.errors["additional_language"][0] == "The language provided is not an acceptable language"


def test_is_field_required_enrollment():
    pharmacy_enrollment_data = {
        "additional_language": "chinese",
        "npi": "123",
        "contact_name": "John",
        "contact_title": "Pharmacy",
        "contact_email": "johndoe@gmail.com",
        "contact_phone_number": "+15167771234",
        "network": "Local Community",
        "initial_rate": "30",
        "isDelivery": False,
        "signature": "John Doe",
        "signed_agreement_admin": "Kevin",
        "signed_agreement_stamp": datetime.datetime.now()
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
