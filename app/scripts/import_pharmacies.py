from api.models import Pharmacy
import csv


def run():
    with open('data/pharmacies.csv') as file:
        reader = csv.reader(file)
        next(reader) 

        Pharmacy.objects.all().delete()
        pharmacies = []

        for row in reader:
            pharmacy = Pharmacy(name=row[0],
                        address=row[1],
                        zipcode=row[2],
                        phone_number="+1"+row[3])
            pharmacies.append(pharmacy)
            
        if pharmacies:
            Pharmacy.objects.bulk_create(pharmacies)
            print("Pharmacy CSV successfully created")
        else:
            print("Something went wrong with pharmacies import")