from twilio.rest import Client
from decouple import config
import datetime
import time
import json
import logging
import pytz

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
        
        timezone = pytz.timezone('US/Eastern')
        hour_now = datetime.datetime.now(timezone).hour
        hour_start = datetime.time(9, 0, 0).hour
        hour_end = datetime.time(18, 0, 0).hour
        
        # if time to send message is within 9am to 6pm, send message right below as normally
        if hour_now >= hour_start and hour_now < hour_end:
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
            
            #might need to add some logic to change the time delta to more than 60 minutes if needed to not error out
            send_when = datetime.datetime.utcnow() + datetime.timedelta(hours=target_hours, minutes=target_minutes)
            print(f"send_when {send_when}")
            print(f"time now in utc is {datetime.datetime.utcnow()}")
            for number in numbers:
                self.client.messages.create(
                    from_=self.messaging_service,
                    to=number,
                    body=f"This request was made to be sent at this utc time {send_when}. time now in utc is {datetime.datetime.utcnow()}, should be around 10:00PM",
                    schedule_type='fixed',
                    send_at=send_when.isoformat() + 'Z',
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
        self.client.messages.create(
            to=origin_request.phone_number.as_e164,
            from_=self.twilio_phone_number,
            body=(
                f"KOW #{origin_request.id}\n"
                f"{origin_request.med_name} is IN STOCK today at...\n"
                f"{pharmacy.name} {'' if 'Pharmacy' in pharmacy.name else 'Pharmacy'}\n"
                f"(p) {pharmacy.phone_number}\n"
                f"{pharmacy.address}, {pharmacy.zipcode}"
                f"This pharmacy accepts the insurance provided: "
                f"BIN: {origin_request.bin}"
                f"PCN: {origin_request.pcn}"
                f"RXGRP: {origin_request.rxgroup}"
            ),
        )
