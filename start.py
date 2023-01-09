from twilio.rest import Client
from dotenv import load_dotenv
import os

load_dotenv()

if __name__ == "__main__":
    """
    Do what you want here. This is just to test random stuff out
    """
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")

    client = Client(account_sid, auth_token)

    message = client.messages.create(
        to="+15167847791",
        from_=os.getenv("TWILIO_MESSAGING_SERVICE"),
        body="Hi, welcome to Fillable Rx1",
    )

    print(message.sid)
