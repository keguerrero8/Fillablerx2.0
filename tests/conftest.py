import pytest

from pytest_factoryboy import register
from tests.api.factories import RequestFactory, PharmacyFactory, MedicationFactory

# register(RequestFactory)
register(PharmacyFactory)
register(MedicationFactory)


@pytest.fixture
def create_medication(db, medication_factory):
    medication = medication_factory.create()
    return medication


@pytest.fixture
def create_pharmacy(db, pharmacy_factory):
    pharmacy = pharmacy_factory.create()
    return pharmacy


# @pytest.fixture
# def new_request(db, request_factory):
#     res = request_factory.build()
#     return res
