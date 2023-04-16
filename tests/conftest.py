import pytest

from pytest_factoryboy import register
from tests.api.factories import (
    PharmacyFactory,
    PharmacistFactory,
    MedicationFactory,
    UserFactory,
)

register(PharmacistFactory)
register(PharmacyFactory)
register(MedicationFactory)
register(UserFactory)


@pytest.fixture
def create_medication(db, medication_factory):
    medication1 = medication_factory.create()
    medication2 = medication_factory.create(name="Amoxicillin", strength=["500mg"])
    return medication1, medication2


@pytest.fixture
def create_pharmacy(db, pharmacy_factory):
    pharmacy = pharmacy_factory.create()
    return pharmacy


@pytest.fixture
def create_pharmacist(db, pharmacist_factory):
    pharmacist = pharmacist_factory.create()
    return pharmacist


@pytest.fixture
def create_user(db, user_factory):
    user = user_factory.create()
    return user
