import datetime
import time


if __name__ == "__main__":
    # datetime.utcnow() + timedelta(minutes=61)
    now = datetime.datetime.now()
    
    time_start = datetime.time(9, 0, 0)
    time_end = datetime.time(18, 0, 0) 
    
    if now.hour >= time_start.hour and now.hour < time_end.hour:
        print("your message will be sent now") 
    else:
        print("your message will be scheduled")

        hour_now = datetime.datetime.now().hour
        minute_now = datetime.datetime.now().minute
        minute_end = datetime.time(0, 59, 0).minute
        print(f"hour now is {hour_now}")
        if hour_now < 9:
            target_hours = datetime.time(8, 0, 0).hour - hour_now
            target_minutes = minute_end - minute_now + 1
        else:
            target_hours = datetime.time(23, 0, 0).hour - hour_now + 9
            target_minutes = minute_end - minute_now + 1
        
        send_when = datetime.datetime.utcnow() + datetime.timedelta(hours=target_hours, minutes=target_minutes)
        print(f"time now is {datetime.datetime.utcnow()}")
        print(f"send_when {send_when}")