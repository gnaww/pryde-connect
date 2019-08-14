from django_cron import CronJobBase, Schedule
from django.core.mail import send_mail
from .models import PUser
from django.template.loader import get_template
from django.core.mail import EmailMultiAlternatives


class TestCronJob(CronJobBase):
    RUN_EVER_MINS = 0.1
    schedule = Schedule(run_every_mins=RUN_EVER_MINS)
    code = 'api.test_cron_job'

    def do(self):

        print('sending email')

        plaintext = get_template('email.txt')
        htmly = get_template('email.html')
        subject = 'PRYDE Connector Weekly Update'
        from_email = 'PRYDEConnector@cornell.edu'

        for user in PUser.objects.filter(receiveEmails=True):
            print(user.email)
            to = user.email

            data = {
                'first_name': user.first_name,
                'last_name': user.last_name,
            }
            text_content = plaintext.render(data)
            html_content = htmly.render(data)

            msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send(fail_silently=False)

