from twilio.rest import Client
from decouple import config
import datetime
import time
import json
import logging
import pytz

logger = logging.getLogger(__name__)


class TwilioClient:
    def __init__(self, is_test=False):
        self.twilio_phone_number = config("TWILIO_PHONE_NUMBER")
        self.account_sid = config("TWILIO_ACCOUNT_SID")
        self.auth_token = config("TWILIO_AUTH_TOKEN")
        self.test_account_sid = config("TWILIO_TEST_ACCOUNT_SID")
        self.test_auth_token = config("TWILIO_TEST_AUTH_TOKEN")
        self.messaging_service = config("TWILIO_MESSAGING_SERVICE")
        self.notify_service = config("TWILIO_NOTIFY_SERVICE_SID")
        if is_test:
            self.client = Client(self.test_account_sid, self.test_auth_token)
        else:
            self.client = Client(self.account_sid, self.auth_token)

    def send_test_sms(self):
        self.client.messages.create(
            body="this is a test", from_="+15005550006", to="+15167847791"
        )

    def send_mass_text(self, request, pharmacist_class, isAdmin=False):
        """
        Sends a mass sms to all pharcists enrolled in platform. The Twilio Notify service will be used to send multiple
        sms with a single API call. Note: On October 2023, the Notify service will be deprecated and we will need a new
        way to send bulk sms. If a request is made outside of working hours (9am - 6pm EST), then it will be scheduled to
        be sent on the following day at 9am.
        """
        if request.isInsurance:
            body = (
                f"KOW #{request.id}\n"
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
                f"KOW #{request.id}\n"
                f"Do you have {request.med_name} {request.med_strength},\n"
                f"quantity: {request.quantity} in stock TODAY?\n"
                f"**\n"
                f"For a patient without insurance.\n"
                f"**\n"
                f"If so, reply '{request.id}'.\n"
                f"If not, please ignore."
            )

        if isAdmin:
            for number in ["+15167847791"]:
                self.client.messages.create(
                    body=body + "\n**admin test",
                    from_=self.twilio_phone_number,
                    to=number,
                )
            return

        pharmacists = pharmacist_class.objects.all()
        enrolled_pharmacists = list(filter(lambda x: x.isEnrolled, pharmacists))
        numbers = list(map(lambda x: x.phone_number.as_e164, enrolled_pharmacists))

        if len(numbers) == 0:
            raise Exception("There were no phone numbers found in the pharmacist table")

        timezone = pytz.timezone("US/Eastern")
        hour_now = datetime.datetime.now(timezone).hour
        hour_start = datetime.time(9, 0, 0).hour
        hour_end = datetime.time(18, 0, 0).hour

        # if time to send message is within 9am to 6pm EST, send message now (unless we have env variable set for local)
        if config("ENVIRONMENT", default="") == "local" or (
            hour_now >= hour_start and hour_now < hour_end
        ):
            print("your message will be sent now")
            bindings = list(
                map(
                    lambda number: json.dumps(
                        {"binding_type": "sms", "address": f"{number}"}
                    ),
                    numbers,
                )
            )
            print("=====> To Bindings :>", bindings, "<: =====")

            self.client.notify.services(self.notify_service).notifications.create(
                to_binding=bindings, body=body
            )
        else:
            print("your message will be scheduled")
            minute_now = datetime.datetime.now().minute
            minute_end = datetime.time(0, 59, 0).minute

            if hour_now < 9:
                target_hours = datetime.time(8, 0, 0).hour - hour_now
                target_minutes = minute_end - minute_now + 1
            else:
                target_hours = datetime.time(23, 0, 0).hour - hour_now + 9
                target_minutes = minute_end - minute_now + 1

            # Special logic because there is a 15min minimum to schedule a message. See docs on limitations of
            # scheduling https://www.twilio.com/docs/sms/api/message-resource#schedule-a-message-resource
            if target_hours == 0 and target_minutes <= 15:
                print(
                    "original message cannot be sent at less than 15mins so will add 15mins"
                )
                target_minutes = 16

            send_when = datetime.datetime.utcnow() + datetime.timedelta(
                hours=target_hours, minutes=target_minutes
            )

            print(f"send_when {send_when}")

            current_time = datetime.datetime.now(timezone).strftime("%I:%M:%S %p")
            day = "yesterday" if "PM" in current_time else "today"
            body = body + f"\n** This request was made {day} at {current_time}."

            for number in numbers:
                self.client.messages.create(
                    from_=self.messaging_service,
                    to=number,
                    body=body,
                    schedule_type="fixed",
                    send_at=send_when.isoformat() + "Z",
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
                f"Thank you for joining KOW!\n"
                f"\n"
                f"If you have any questions or would like to reach us, "
                f"please email us at help@kowmeds.com."
            ),
        )
        logging.debug(f"successfully sent an sms to enrolled pharmacist")

    def inbound_to_patient(self, origin_request, pharmacy):
        pharmacy_intro = (
            f"KOW #{origin_request.id}\n"
            f"{origin_request.med_name} {origin_request.med_strength},\n"
            f"quantity: {origin_request.quantity} is IN STOCK today.\n"
            f"\n"
            f"Please contact:\n"
            f"{pharmacy.name}\n"
            f"{pharmacy.address}, {pharmacy.zipcode}\n"
            f"(p) {pharmacy.phone_number}\n"
        )
        pharmacy_delivery = (
            f"\nOffers Free Delivery!\n" if pharmacy.isDelivery else "\n"
        )
        pharmacy_language = (
            f"Also speaks {pharmacy.additional_language}!\n"
            if pharmacy.additional_language and pharmacy.additional_language != "none"
            else ""
        )
        pharmacy_outro = (
            f"\n"
            f"This pharmacy accepts the insurance (if provided):\n"
            f"BIN: {origin_request.bin}\n"
            f"PCN: {origin_request.pcn}\n"
            f"RxGRP: {origin_request.rxgroup}"
            f"\n"
            f"What's next?\n"
            f"Either:\n"
            f"1) Ask the pharmacist to transfer a refill to this new pharmacy, or\n"
            f"2) Ask the provider to send the prescription to this new pharmacy."
        )
        self.client.messages.create(
            to=origin_request.phone_number.as_e164,
            from_=self.twilio_phone_number,
            body=pharmacy_intro
            + pharmacy_delivery
            + pharmacy_language
            + pharmacy_outro,
        )
