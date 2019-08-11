from django.core.mail import EmailMessage


def send_email():
    msg = EmailMessage('Request Callback',
                       'Here is the message.', to=['charl@byteorbit.com'])
    msg.send()

send_email()