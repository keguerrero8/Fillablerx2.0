from rest_framework import serializers

from .models import Pharmacy, Pharmacist, Request, Medication        
        
class PharmacySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacy
        fields = "__all__"


class PharmacistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacist
        fields = "__all__"


class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = ["id", "name", "strength"]


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = "__all__"

    def validate_bin(self, value):
        isInsurance = self.initial_data.get("isInsurance")
        if isInsurance and value == "":
            raise serializers.ValidationError("Please provide a valid BIN")
        return value

    def validate_pcn(self, value):
        isInsurance = self.initial_data.get("isInsurance")
        if isInsurance and value == "":
            raise serializers.ValidationError("Please provide a valid PCN")
        return value

    def validate_rxgroup(self, value):
        isInsurance = self.initial_data.get("isInsurance")
        if isInsurance and value == "":
            raise serializers.ValidationError("Please provide a valid RxGroup")
        return value

    def validate_med_strength(self, value):
        med_name = self.initial_data.get("med_name")
        try:
            medication = Medication.objects.get(name=med_name)
        except Medication.DoesNotExist:
            raise serializers.ValidationError("The medication name is not valid")

        if len(medication.strength) and value == "":
            raise serializers.ValidationError("Please provide a medication strength")
        return value
