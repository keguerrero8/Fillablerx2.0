from rest_framework import serializers

from .models import Pharmacy, Pharmacist, Request, Medication


class PharmacySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacy
        fields = "__all__"

    def is_field_required_enrollment(self):
        all_fields = [
            "contact_name",
            "contact_title",
            "contact_email",
            "contact_phone_number",
            "npi",
            "network",
            "signed_agreement_stamp",
            "signature",
            "signed_agreement_admin",
        ]
        # FIXME update logic so that it will look to see if all the fields above are found in the data_keys, no more, no less
        # if these conditions are not met, then we should return False. right now, if we add another required field we will need
        # to add it to all_fields
        for key in self.initial_data.keys():
            if key not in all_fields:
                return False
        return True

    def validate_zipcode(self, value):
        if len(value) != 5 or not value.isnumeric():
            raise serializers.ValidationError("A valid zipcode must be 5 digits")
        return value

    def validate_npi(self, value):
        if value == "" and self.is_field_required_enrollment():
            raise serializers.ValidationError("A valid npi must be provided")

        if not value.isnumeric():
            raise serializers.ValidationError("A valid npi must be numerical")
        return value

    def validate_contact_name(self, value):
        if value == "" and self.is_field_required_enrollment():
            raise serializers.ValidationError("A contact name must be provided")
        return value

    def validate_contact_title(self, value):
        if value == "" and self.is_field_required_enrollment():
            raise serializers.ValidationError("A contact title must be provided")
        return value

    def validate_contact_email(self, value):
        if value == "" and self.is_field_required_enrollment():
            raise serializers.ValidationError("A contact email must be provided")
        return value

    def validate_contact_phone_number(self, value):
        if value == "" and self.is_field_required_enrollment():
            raise serializers.ValidationError("A contact phone number must be provided")
        return value
    
    def validate_contact_network(self, value):
        if value == "" and self.is_field_required_enrollment():
            raise serializers.ValidationError("A contact email must be provided")
        return value

    def validate_signature(self, value):
        if value == "" and self.is_field_required_enrollment():
            raise serializers.ValidationError("A signature must be provided")
        return value

    def validate_signed_agreement_admin(self, value):
        if value == "" and self.is_field_required_enrollment():
            raise serializers.ValidationError("A signed admin must be provided")
        return value


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

    def validate_quantity(self, value):
        if not value.isnumeric():
            raise serializers.ValidationError("must be a valid number")
        return value

    def validate_med_name(self, value):
        if value == "":
            raise serializers.ValidationError(
                "must be a valid medication from the dropdown options"
            )
        return value

    def validate_bin(self, value):
        isInsurance = self.initial_data.get("isInsurance")
        if isInsurance and value == "":
            raise serializers.ValidationError("Please provide a valid BIN")
        elif isInsurance and (len(value) != 6 or not value.isnumeric()):
            raise serializers.ValidationError("A valid BIN should be 6 digits")
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
            raise serializers.ValidationError("The medication name must be valid")

        if len(medication.strength) and value == "":
            raise serializers.ValidationError("Please provide a medication strength")

        if value not in medication.strength and value != "":
            raise serializers.ValidationError(
                "Please select a valid medication strength from the dropdown"
            )
        return value

    def validate_user_type(self, value):
        if value != "patient" and value != "health_care_provider":
            raise serializers.ValidationError(
                "User type must be either patient or health care provider"
            )
        return value
