from api.models import Medication
import csv


def run():
    with open("data/medications.csv") as file:
        reader = csv.reader(file)
        next(reader)
        failures = 0

        for row in reader:
            med_name = row[0].rstrip()
            raw_strength = row[1].split(";")
            filtered_strength = list(filter(lambda s: s != "", raw_strength))
            for strength in filtered_strength:
                try:
                    medication = Medication.objects.get(name=med_name)
                    if strength not in medication.strength:
                        raise Exception
                except:
                    print(
                        f"failure: med name of {med_name} and med strength of {strength} dont match"
                    )
                    failures += 1

        if failures > 0:
            print(f"Uh oh, there were {failures} failures")
        else:
            print("all tests passed!")
