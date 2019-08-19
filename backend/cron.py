import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "pryde_backend.settings")
import django
django.setup()

from django.core.mail import send_mail
from api.models import UserEmailPreferences
from django.template.loader import get_template
from django.core.mail import EmailMultiAlternatives
from datetime import datetime
import calendar

# subtract or add [delta] months to [date]
# ex: monthdelta(date, -1) to subtract a month
#     monthdelta(date, 1) to add a month
def monthdelta(date, delta):
    m, y = (date.month+delta) % 12, date.year + ((date.month)+delta-1) // 12
    if not m: m = 12
    d = min(date.day, calendar.monthrange(y, m)[1])
    return date.replace(day=d,month=m, year=y)

# TODO: implement preference setting for user role types
def send_emails():
    one_month_ago = monthdelta(datetime.now(), -1)

    projects_matching_preferences = UserEmailPreferences.objects.raw(
        """
        SELECT 	api_useremailpreferences.id,
                api_useremailpreferences.type,
                preferenceName,
                preferenceValue,
                user_id,
                project_id,
                api_project.name,
                api_project.owner_id,
                api_puser.first_name,
                api_puser.last_name,
                api_project.datePosted
        FROM api_useremailpreferences
        JOIN api_agerangeproject
        ON api_agerangeproject.ageRange = api_useremailpreferences.preferenceValue AND
        api_useremailpreferences.preferenceName = 'ageRange' AND
        api_useremailpreferences.type = '1'
        JOIN api_project
        ON api_project.id = api_agerangeproject.project_id
        JOIN api_puser
        ON api_puser.id = api_project.owner_id
        WHERE
        api_project.owner_id != api_useremailpreferences.user_id AND
        api_project.datePosted >= %s
        UNION
        SELECT 	api_useremailpreferences.id,
                api_useremailpreferences.type,
                preferenceName,
                preferenceValue,
                user_id,
                project_id,
                api_project.name,
                api_project.owner_id,
                api_puser.first_name,
                api_puser.last_name,
                api_project.datePosted
        FROM api_useremailpreferences
        JOIN api_deliverymodeproject
        ON api_deliverymodeproject.deliveryMode = api_useremailpreferences.preferenceValue AND
        api_useremailpreferences.preferenceName = 'deliveryMode' AND
        api_useremailpreferences.type = '1'
        JOIN api_project
        ON api_project.id = api_deliverymodeproject.project_id
        JOIN api_puser
        ON api_puser.id = api_project.owner_id
        WHERE
        api_project.owner_id != api_useremailpreferences.user_id AND
        api_project.datePosted >= %s
        UNION
        SELECT 	api_useremailpreferences.id,
                api_useremailpreferences.type,
                preferenceName,
                preferenceValue,
                user_id,
                project_id,
                api_project.name,
                api_project.owner_id,
                api_puser.first_name,
                api_puser.last_name,
                api_project.datePosted
        FROM api_useremailpreferences
        JOIN api_topicsproject
        ON api_topicsproject.researchTopic = api_useremailpreferences.preferenceValue AND
        api_useremailpreferences.preferenceName = 'researchTopic' AND
        api_useremailpreferences.type = '1'
        JOIN api_project
        ON api_project.id = api_topicsproject.project_id
        JOIN api_puser
        ON api_puser.id = api_project.owner_id
        WHERE
        api_project.owner_id != api_useremailpreferences.user_id AND
        api_project.datePosted >= %s
        ORDER BY user_id;
        """,
        [one_month_ago, one_month_ago, one_month_ago]
    )

    users_matching_preferences = UserEmailPreferences.objects.raw(
        """
        SELECT	api_useremailpreferences.id,
                api_useremailpreferences.type,
                api_useremailpreferences.preferenceName,
                api_useremailpreferences.preferenceValue,
                api_useremailpreferences.user_id,
                api_puser.id AS matched_user_id,
                api_puser.first_name,
                api_puser.last_name,
                api_puser.role,
                api_puser.location,
                api_puser.date_joined
        FROM api_useremailpreferences
        JOIN api_agerangeuser
        ON api_agerangeuser.ageRange = api_useremailpreferences.preferenceValue AND
        api_useremailpreferences.preferenceName = 'ageRange' AND
        api_useremailpreferences.type = '2'
        JOIN api_puser
        ON api_puser.id = api_agerangeuser.user_id
        WHERE
        api_puser.id != api_useremailpreferences.user_id AND
        api_puser.date_joined >= %s
        UNION
        SELECT	api_useremailpreferences.id,
                api_useremailpreferences.type,
                api_useremailpreferences.preferenceName,
                api_useremailpreferences.preferenceValue,
                api_useremailpreferences.user_id,
                api_puser.id AS matched_user_id,
                api_puser.first_name,
                api_puser.last_name,
                api_puser.role,
                api_puser.location,
                api_puser.date_joined
        FROM api_useremailpreferences
        JOIN api_researchinterestuser
        ON api_researchinterestuser.researchInterest = api_useremailpreferences.preferenceValue AND
        api_useremailpreferences.preferenceName = 'researchInterest' AND
        api_useremailpreferences.type = '2'
        JOIN api_puser
        ON api_puser.id = api_researchinterestuser.user_id
        WHERE
        api_puser.id != api_useremailpreferences.user_id AND
        api_puser.date_joined >= %s
        UNION
        SELECT	api_useremailpreferences.id,
                api_useremailpreferences.type,
                api_useremailpreferences.preferenceName,
                api_useremailpreferences.preferenceValue,
                api_useremailpreferences.user_id,
                api_puser.id AS matched_user_id,
                api_puser.first_name,
                api_puser.last_name,
                api_puser.role,
                api_puser.location,
                api_puser.date_joined
        FROM api_useremailpreferences
        JOIN api_deliverymodeuser
        ON api_deliverymodeuser.deliveryMode = api_useremailpreferences.preferenceValue AND
        api_useremailpreferences.preferenceName = 'deliveryMode' AND
        api_useremailpreferences.type = '2'
        JOIN api_puser
        ON api_puser.id = api_deliverymodeuser.user_id
        WHERE
        api_puser.id != api_useremailpreferences.user_id AND
        api_puser.date_joined >= %s
        ORDER BY user_id;
        """,
        [one_month_ago, one_month_ago, one_month_ago]
    )

    print(len(projects_matching_preferences))
    for project in projects_matching_preferences:
        row = "%s %s %s %s %s %s %s %s %s %s %s" % (project.id, project.type, project.preferenceName, project.preferenceValue, project.user_id, project.project_id, project.name, project.owner_id, project.first_name, project.last_name, project.datePosted)
        print(row)

    print("##############################")

    print(len(users_matching_preferences))
    for user in users_matching_preferences:
        row = "%s %s %s %s %s %s %s %s %s %s %s" % (user.id, user.type, user.preferenceName, user.preferenceValue, user.user_id, user.matched_user_id, user.first_name, user.last_name, user.role, user.location, user.date_joined)
        print(row)


def send_monthly_emails():
    plaintext = get_template('email.txt')
    htmly = get_template('email.html')
    subject = 'PRYDE Connect Monthly Digest'
    from_email = 'prydeconnect@cornell.edu'

    for user in PUser.public_objects.filter(receiveEmails=True):
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
