import factory

from api.models import Request, Pharmacy, Pharmacist, Medication


class MedicationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Medication

    name = "Abacavir"
    brand_name = ("brand_name",)
    strength = ("300mg",)


# do we need a test that tests if the med name matches with med strength?
# do we need a test to check that user type can only be hcp or patient?
class RequestFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Request

    phone_number = ("+15169998888",)
    med_name = ("med_name",)
    med_strength = ("med_strength",)
    quantity = (1,)
    bin_num = ("123456",)
    pcn = ("123",)
    rxgroup = ("rxgroup",)
    isInsurance = (True,)
    user_type = "patient"


# do we need a test to test if zipcode is a valid zipcode? num length?
class PharmacyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Pharmacy

    name = "name"
    address = ("address",)
    zipcode = ("zipcode",)
    phone_number = ("+15169998888",)


# TO REVISIT
# class PharmacistFactory(factory.django.DjangoModelFactory):
#     class Meta:
#         model = Pharmacist

#     name="name"
#     email="email",
#     isEnrolled=True,
#     phone_number="+15169998888",
#     pharmacy=1
