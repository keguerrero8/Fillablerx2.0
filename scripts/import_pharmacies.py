import csv
from api.models import Pharmacy


def run():
    with open("data/pharmacies.csv") as file:
        reader = csv.reader(file)
        next(reader)
        # Pharmacy.objects.all().delete()
        pharmacies = []

        for row in reader:
            name, address, zipcode, phone_number = row

            # Check if there is already a pharmacy with the same values
            existing_pharmacy = Pharmacy.objects.filter(
                name=name,
                address=address,
                zipcode=zipcode,
                phone_number="+1" + phone_number,
            )

            if len(existing_pharmacy):
                continue
            else:
                pharmacy = Pharmacy(
                    name=name,
                    address=address,
                    zipcode=zipcode,
                    phone_number="+1" + phone_number,
                )
                pharmacies.append(pharmacy)

        if pharmacies:
            Pharmacy.objects.bulk_create(pharmacies)
            print(f"{len(pharmacies)} Pharmacies successfully created")
        else:
            print("No new pharmacies to create")
