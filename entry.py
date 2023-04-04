import datetime
import time
import pytz


if __name__ == "__main__":
    # datetime.utcnow() + timedelta(minutes=61)
    now = datetime.datetime.now()
    print(now)

    # time_start = datetime.time(9, 0, 0)
    # time_end = datetime.time(18, 0, 0)

    # if now.hour >= time_start.hour and now.hour < time_end.hour:
    #     print("your message will be sent now")
    # else:
    #     print("your message will be scheduled")

    #     body = (
    #         f"FillableRx #\n"
    #         f"Do you have,\n"
    #         f"quantity: in stock TODAY?\n"
    #         f"**\n"
    #         f"For a patient with this insurance:\n"
    #         f"If so, reply OK.\n"
    #         f"If not, please ignore."
    #     )

    #     timezone = pytz.timezone("US/Eastern")
    #     # time_now = datetime.datetime.now(timezone)
    #     current_time = datetime.datetime.now(timezone).strftime("%I:%M:%S %p")
    #     if "PM" in current_time:
    #         day = "yesterday"
    #     else:
    #         day = "today"
    #     # print("Current Time in 12 Hour Format:", current_time)

    #     body = body + f"\n** This request was made {day} at {current_time}."

    #     print(f"body:\n{body}")

    #     hour_now = datetime.datetime.now().hour
    #     minute_now = datetime.datetime.now().minute
    #     minute_end = datetime.time(0, 59, 0).minute
    #     # print(f"hour now is {hour_now}")
    #     if hour_now < 9:
    #         target_hours = datetime.time(8, 0, 0).hour - hour_now
    #         target_minutes = minute_end - minute_now + 1
    #     else:
    #         target_hours = datetime.time(23, 0, 0).hour - hour_now + 9
    #         target_minutes = minute_end - minute_now + 1

    #     send_when = datetime.datetime.utcnow() + datetime.timedelta(
    #         hours=target_hours, minutes=target_minutes
    #     )
