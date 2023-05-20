from api.models import Medication
import csv


def run():
    with open("data/medications.csv") as file:
        reader = csv.reader(file)
        next(reader)
        Medication.objects.all().delete()
        medications = []

        for row in reader:
            med_name = row[0].rstrip()
            raw_strength = row[1].split(";")
            filtered_strength = list(filter(lambda s: s != "", raw_strength))
            is_specialty = True if "y" in row[2] else False
            medication = Medication(
                name=med_name, strength=filtered_strength, isSpecialty=is_specialty
            )
            medications.append(medication)

        if medications:
            Medication.objects.bulk_create(medications)
            print("Medications CSV successfully created")
        else:
            print("Something went wrong with medications import")
