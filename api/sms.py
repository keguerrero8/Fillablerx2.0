from twilio.rest import Client
from decouple import config
import json
import logging

logger = logging.getLogger(__name__)

class TwilioClient:
    def __init__(self):
        self.twilio_phone_number = config("TWILIO_PHONE_NUMBER")
        self.account_sid = config("TWILIO_ACCOUNT_SID")
        self.auth_token = config("TWILIO_AUTH_TOKEN")
        self.messaging_service = config("TWILIO_MESSAGING_SERVICE")
        self.notify_service = config("TWILIO_NOTIFY_SERVICE_SID")
        self.client = Client(self.account_sid, self.auth_token)

    def send_mass_text(self, request, pharmacist_class):
        """
        Sends a mass sms to all pharcists enrolled in platform. The Twilio Notify service will be used to send multiple
        sms with a single API call. Note: On October 2023, the Notify service will be deprecated and we will need a new
        way to send bulk sms
        """
        pharmacists = pharmacist_class.objects.all()
        enrolled_pharmacists = list(filter(lambda x: x.isEnrolled, pharmacists))
        numbers = list(map(lambda x: x.phone_number.as_e164, enrolled_pharmacists))
        bindings = list(
            map(
                lambda number: json.dumps(
                    {"binding_type": "sms", "address": f"{number}"}
                ),
                numbers,
            )
        )
        print("=====> To Bindings :>", bindings, "<: =====")

        if request.isInsurance:
            body = (
                f"FillableRx #{request.id}\n"
                f"Do you have {request.med_name} {request.med_strength},\n"
                f"quantity: {request.quantity} in stock TODAY?\n"
                f"**\n"
                f"For a patient with this insurance:\n"
                f"BIN: {request.bin}\n"
                f"PCN: {request.pcn}\n"
                f"RxGRP: {request.rxgroup}\n"
                f"**\n"
                f"If so, reply '{request.id}'.\n"
                f"If not, please ignore."
            )
        else:
            body = (
                f"FillableRx #{request.id}\n"
                f"Do you have {request.med_name} {request.med_strength},\n"
                f"quantity: {request.quantity} in stock TODAY?\n"
                f"**\n"
                f"For a Cash-paying patient.\n"
                f"**\n"
                f"If so, reply '{request.id}'.\n"
                f"If not, please ignore."
            )

        self.client.notify.services(self.notify_service).notifications.create(
            to_binding=bindings, body=body
        )

    def enroll_pharmacist_text(self, pharmacist):
        """
        Sends an sms to a pharmacist when they are created on the platform.
        """
        logging.debug(f"starting twilio service to send enrollment text to pharmacist")
        logging.debug(f"the phone number to text is {pharmacist.phone_number.as_e164}")
        logging.debug(f"the twilio phone number is {self.twilio_phone_number}")
        self.client.messages.create(
            to=pharmacist.phone_number.as_e164,
            from_=self.twilio_phone_number,
            body=(
                f"Thank you for joining FillableRx!\n"
                f"\n"
                f"If you have any questions or would like to contact us, "
                f"please email your account manager, Larry (larrychen.fillable@gmail.com)."
            ),
        )
        logging.debug(f"successfully sent an sms to enrolled pharmacist")

    def inbound_to_patient(self, origin_request, pharmacy):
        self.client.messages.create(
            to=origin_request.phone_number.as_e164,
            from_=self.twilio_phone_number,
            body=(
                f"FillableRx #{origin_request.id}\n"
                f"{origin_request.med_name} is IN STOCK\n"
                f"{pharmacy.name} Pharmacy\n"
                f"{pharmacy.phone_number}\n"
                f"{pharmacy.address}, {pharmacy.zipcode}"
            ),
        )
