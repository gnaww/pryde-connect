import sys
sys.path.append("..")

from cron import send_emails

def send_emails_driver():
    send_emails()

send_emails_driver()
