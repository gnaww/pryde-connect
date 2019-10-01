import sys
sys.path.append("..")

from cron import send_emails

# Wrapper script to call script that sends out monthly newsletter emails
# This was done as a workaround for issues with importing packages within packages in Python
def send_emails_driver():
    send_emails()

send_emails_driver()
