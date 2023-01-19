from api.models import Medication
import csv


def run():
    with open("data/medications.csv") as file:
        reader = csv.reader(file)
        next(reader)

        Medication.objects.all().delete()
        medications = []

        for row in reader:
            strength = row[1].split(";")
            medication = Medication(name=row[0], strength=strength)
            medications.append(medication)

        if medications:
            Medication.objects.bulk_create(medications)
            print("Medications CSV successfully created")
        else:
            print("Something went wrong with medications import")
