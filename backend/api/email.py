from django.core.mail import send_mail


def send_email():
    send_mail(
        'Subject here',
        'Here is the message.',
        'from@example.com',
        ['barronfran@gmail.com'],
        fail_silently=False,
    )


send_email()