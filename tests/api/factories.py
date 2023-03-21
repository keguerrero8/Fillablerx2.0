import factory

from api.models import Request, Pharmacy, Medication, Pharmacist


class MedicationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Medication

    name = "Abacavir"
    brand_name = ("brand_name",)
    strength = ("300mg",)


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


class PharmacyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Pharmacy

    name = "name"
    address = "address"
    zipcode = "11111"
    phone_number = "+15169998888"


# TO REVISIT
# class PharmacistFactory(factory.django.DjangoModelFactory):
#     class Meta:
#         model = Pharmacist

#     name="name"
#     email="email",
#     isEnrolled=True,
#     phone_number="+15169998888",
#     pharmacy=1
