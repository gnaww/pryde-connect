# used to get access to Django in script
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "pryde_backend.settings")
import django
django.setup()

from django.core.mail import send_mail
from api.models import PUser, UserEmailPreference
from django.template.loader import get_template
from django.core.mail import EmailMultiAlternatives
from datetime import datetime
import calendar

# Subtracts or adds [delta] months to [date]
# ex: monthdelta(date, -1) to subtract a month
#     monthdelta(date, 1) to add a month
def monthdelta(date, delta):
    m, y = (date.month+delta) % 12, date.year + ((date.month)+delta-1) // 12
    if not m: m = 12
    d = min(date.day, calendar.monthrange(y, m)[1])
    return date.replace(day=d,month=m, year=y)

# Returns a dictionary of emails to be sent to users in this format:
# {
#     [ID of user to be emailed]: {
#         "users": [
#             user1,
#             user2,
#             ...
#         ],
#         "projects": [
#             project1,
#             project2,
#             ...
#         ]
#     },
#     [ID of user to be emailed]: {
#         ...
#     },
#     ...
# }
def build_emails(projects_matching_preferences, users_matching_preferences):
    user_emails = {}
    if (len(projects_matching_preferences) != 0):
        # initialize to first user's email preference results
        user_id_to_be_emailed = projects_matching_preferences[0].user_id
        email = {
            "users": [],
            "projects":  []
        }

        for project in projects_matching_preferences:
            if project.user_id == user_id_to_be_emailed:
                email['projects'].append({
                    "id": project.project_id,
                    "name": project.name,
                    "owner_id": project.owner_id,
                    "owner_name": "%s %s" % (project.first_name, project.last_name),
                    "date_posted":  project.datePosted.strftime("%m/%d/%Y")
                })
            else:
                # must be a new user's preference results if the user_id has changed
                user_emails[user_id_to_be_emailed] = email
                # populate new user's email dictionary with current preference result
                email = {
                    "users": [],
                    "projects": [{
                        "id": project.project_id,
                        "name": project.name,
                        "owner_id": project.owner_id,
                        "owner_name": "%s %s" % (project.first_name, project.last_name),
                        "date_posted":  project.datePosted.strftime("%m/%d/%Y")
                    }]
                }
                user_id_to_be_emailed = project.user_id

        user_emails[user_id_to_be_emailed] = email

    if (len(users_matching_preferences) != 0):
        # initialize to first user's email preference results
        user_id_to_be_emailed = users_matching_preferences[0].user_id
        # if this user has no preferences for projects, then use an empty email dictionary
        email = user_emails.get(user_id_to_be_emailed, {
            "users": [],
            "projects":  []
        })

        for user in users_matching_preferences:
            if user.user_id == user_id_to_be_emailed:
                email['users'].append({
                    "id": user.matched_user_id,
                    "name": "%s %s" % (user.first_name, user.last_name),
                    "role": "practitioner" if user.role == '1' else "researcher",
                    "location": user.location,
                    "date_joined": user.date_joined.strftime("%m/%d/%Y")
                })
            else:
                # must be a new user's preference results if the user_id has changed
                user_emails[user_id_to_be_emailed] = email
                # populate new user's email object with current preference result
                user_id_to_be_emailed = user.user_id
                # if this user has no preferences for projects, then use an empty email object
                email = user_emails.get(user_id_to_be_emailed, {
                    "users": [],
                    "projects":  []
                })
                email['users'].append({
                    "id": user.matched_user_id,
                    "name": "%s %s" % (user.first_name, user.last_name),
                    "role": "practitioner" if user.role == '1' else "researcher",
                    "location": user.location,
                    "date_joined": user.date_joined.strftime("%m/%d/%Y")
                })

        user_emails[user_id_to_be_emailed] = email

    return user_emails

def send_emails():
    current_date = datetime.now()
    one_month_ago = monthdelta(current_date, -1)

    # retrieve projects created in the past month matching each users' project email preferences
    projects_matching_preferences = UserEmailPreference.objects.raw(
        """
        SELECT  MAX(id) as id,
                user_id,
                project_id,
                MAX(name) AS name,
                MAX(owner_id) AS owner_id,
                MAX(first_name) AS first_name,
                MAX(last_name) AS last_name,
                MAX("datePosted") AS "datePosted"
        FROM (
            SELECT 	api_useremailpreference.id,
                    user_id,
                    project_id,
                    api_project.name,
                    api_project.owner_id,
                    api_puser.first_name,
                    api_puser.last_name,
                    api_project."datePosted"
            FROM api_useremailpreference
            JOIN api_agerangeproject
            ON api_agerangeproject."ageRange" = api_useremailpreference."preferenceValue" AND
            api_useremailpreference."preferenceName" = 'ageRange' AND
            api_useremailpreference.type = '1'
            JOIN api_project
            ON api_project.id = api_agerangeproject.project_id
            JOIN api_puser
            ON api_puser.id = api_project.owner_id
            WHERE
            api_project.owner_id != api_useremailpreference.user_id AND
            api_project."datePosted" >= %s
            UNION
            SELECT 	api_useremailpreference.id,
                    user_id,
                    project_id,
                    api_project.name,
                    api_project.owner_id,
                    api_puser.first_name,
                    api_puser.last_name,
                    api_project."datePosted"
            FROM api_useremailpreference
            JOIN api_deliverymodeproject
            ON api_deliverymodeproject."deliveryMode" = api_useremailpreference."preferenceValue" AND
            api_useremailpreference."preferenceName" = 'deliveryMode' AND
            api_useremailpreference.type = '1'
            JOIN api_project
            ON api_project.id = api_deliverymodeproject.project_id
            JOIN api_puser
            ON api_puser.id = api_project.owner_id
            WHERE
            api_project.owner_id != api_useremailpreference.user_id AND
            api_project."datePosted" >= %s
            UNION
            SELECT 	api_useremailpreference.id,
                    user_id,
                    project_id,
                    api_project.name,
                    api_project.owner_id,
                    api_puser.first_name,
                    api_puser.last_name,
                    api_project."datePosted"
            FROM api_useremailpreference
            JOIN api_deliverymodeproject
            ON api_useremailpreference."preferenceValue" = 'Other' AND api_deliverymodeproject."deliveryMode"
            NOT IN ('Afterschool programs', 'Camps', 'Clubs') AND
            api_useremailpreference."preferenceName" = 'deliveryMode' AND
            api_useremailpreference.type = '1'
            JOIN api_project
            ON api_project.id = api_deliverymodeproject.project_id
            JOIN api_puser
            ON api_puser.id = api_project.owner_id
            WHERE
            api_project.owner_id != api_useremailpreference.user_id AND
            api_project."datePosted" >= %s
            UNION
            SELECT 	api_useremailpreference.id,
                    user_id,
                    project_id,
                    api_project.name,
                    api_project.owner_id,
                    api_puser.first_name,
                    api_puser.last_name,
                    api_project."datePosted"
            FROM api_useremailpreference
            JOIN api_topicsproject
            ON api_topicsproject."researchTopic" = api_useremailpreference."preferenceValue" AND
            api_useremailpreference."preferenceName" = 'researchTopic' AND
            api_useremailpreference.type = '1'
            JOIN api_project
            ON api_project.id = api_topicsproject.project_id
            JOIN api_puser
            ON api_puser.id = api_project.owner_id
            WHERE
            api_project.owner_id != api_useremailpreference.user_id AND
            api_project."datePosted" >= %s
            UNION
            SELECT 	api_useremailpreference.id,
                    user_id,
                    project_id,
                    api_project.name,
                    api_project.owner_id,
                    api_puser.first_name,
                    api_puser.last_name,
                    api_project."datePosted"
            FROM api_useremailpreference
            JOIN api_topicsproject
            ON api_useremailpreference."preferenceValue" = 'Other' AND api_topicsproject."researchTopic"
            NOT IN ('Animal Science', 'Agriculture', 'Career Readiness', 'Civic Engagement', 'Diversity Equity & Inclusion',
            'Education & Learning', 'Energy', 'Environment & Sustainability', 'Families', 'Gardening & Horticulture',
            'Health & Wellness', 'Intergenerational Engagement', 'Life Skills', 'Media & Technology', 'Motivation',
            'Nutrition', 'Outdoor Education', 'Parenting', 'Peer Relationships', 'Positive Youth Development',
            'Policy Analysis', 'Program Evaluation', 'Risk Behavior', 'Self & Identity', 'Science Technology Engineering & Math (STEM)',
            'Volunteer Engagement', 'Youth/Adult Relationships') AND
            api_useremailpreference."preferenceName" = 'researchTopic' AND
            api_useremailpreference.type = '1'
            JOIN api_project
            ON api_project.id = api_topicsproject.project_id
            JOIN api_puser
            ON api_puser.id = api_project.owner_id
            WHERE
            api_project.owner_id != api_useremailpreference.user_id AND
            api_project."datePosted" >= %s
        ) as temp
        GROUP BY user_id, project_id
        ORDER BY user_id, name;
        """,
        [one_month_ago, one_month_ago, one_month_ago, one_month_ago, one_month_ago]
    )

    # retrieve users joined in the past month matching each users' user email preferences
    users_matching_preferences = UserEmailPreference.objects.raw(
        """
        SELECT	MAX(id) as id,
                user_id,
                matched_user_id,
                MAX(first_name) as first_name,
                MAX(last_name) as last_name,
                MAX(role) as role,
                MAX(location) as location,
                MAX(date_joined) as date_joined
        FROM (
            SELECT	api_useremailpreference.id,
                    api_useremailpreference.user_id,
                    api_puser.id AS matched_user_id,
                    api_puser.first_name,
                    api_puser.last_name,
                    api_puser.role,
                    api_puser.location,
                    api_puser.date_joined
            FROM api_useremailpreference
            JOIN api_agerangeuser
            ON api_agerangeuser."ageRange" = api_useremailpreference."preferenceValue" AND
            api_useremailpreference."preferenceName" = 'ageRange' AND
            api_useremailpreference.type = '2'
            JOIN api_puser
            ON api_puser.id = api_agerangeuser.user_id
            WHERE
            api_puser.id != api_useremailpreference.user_id AND
            api_puser.date_joined >= %s
            UNION
            SELECT	api_useremailpreference.id,
                    api_useremailpreference.user_id,
                    api_puser.id AS matched_user_id,
                    api_puser.first_name,
                    api_puser.last_name,
                    api_puser.role,
                    api_puser.location,
                    api_puser.date_joined
            FROM api_useremailpreference
            JOIN api_researchinterestuser
            ON api_researchinterestuser."researchInterest" = api_useremailpreference."preferenceValue" AND
            api_useremailpreference."preferenceName" = 'researchInterest' AND
            api_useremailpreference.type = '2'
            JOIN api_puser
            ON api_puser.id = api_researchinterestuser.user_id
            WHERE
            api_puser.id != api_useremailpreference.user_id AND
            api_puser.date_joined >= %s
            UNION
            SELECT 	api_useremailpreference.id,
                    api_useremailpreference.user_id,
                    api_puser.id AS matched_user_id,
                    api_puser.first_name,
                    api_puser.last_name,
                    api_puser.role,
                    api_puser.location,
                    api_puser.date_joined
            FROM api_useremailpreference
            JOIN api_researchinterestuser
            ON api_useremailpreference."preferenceValue" = 'Other' AND api_researchinterestuser."researchInterest"
            NOT IN ('Animal Science', 'Agriculture', 'Career Readiness', 'Civic Engagement', 'Diversity Equity & Inclusion',
            'Education & Learning', 'Energy', 'Environment & Sustainability', 'Families', 'Gardening & Horticulture',
            'Health & Wellness', 'Intergenerational Engagement', 'Life Skills', 'Media & Technology', 'Motivation',
            'Nutrition', 'Outdoor Education', 'Parenting', 'Peer Relationships', 'Positive Youth Development',
            'Policy Analysis', 'Program Evaluation', 'Risk Behavior', 'Self & Identity', 'Science Technology Engineering & Math (STEM)',
            'Volunteer Engagement', 'Youth/Adult Relationships') AND
            api_useremailpreference."preferenceName" = 'researchInterest' AND
            api_useremailpreference.type = '2'
            JOIN api_puser
            ON api_puser.id = api_researchinterestuser.user_id
            WHERE
            api_puser.id != api_useremailpreference.user_id AND
            api_puser.date_joined >= %s
            UNION
            SELECT	api_useremailpreference.id,
                    api_useremailpreference.user_id,
                    api_puser.id AS matched_user_id,
                    api_puser.first_name,
                    api_puser.last_name,
                    api_puser.role,
                    api_puser.location,
                    api_puser.date_joined
            FROM api_useremailpreference
            JOIN api_deliverymodeuser
            ON api_deliverymodeuser."deliveryMode" = api_useremailpreference."preferenceValue" AND
            api_useremailpreference."preferenceName" = 'deliveryMode' AND
            api_useremailpreference.type = '2'
            JOIN api_puser
            ON api_puser.id = api_deliverymodeuser.user_id
            WHERE
            api_puser.id != api_useremailpreference.user_id AND
            api_puser.date_joined >= %s
            UNION
            SELECT 	api_useremailpreference.id,
                    api_useremailpreference.user_id,
                    api_puser.id AS matched_user_id,
                    api_puser.first_name,
                    api_puser.last_name,
                    api_puser.role,
                    api_puser.location,
                    api_puser.date_joined
            FROM api_useremailpreference
            JOIN api_deliverymodeuser
            ON api_useremailpreference."preferenceValue" = 'Other' AND api_deliverymodeuser."deliveryMode"
            NOT IN ('Afterschool programs', 'Camps', 'Clubs') AND
            api_useremailpreference."preferenceName" = 'deliveryMode' AND
            api_useremailpreference.type = '2'
            JOIN api_puser
            ON api_puser.id = api_deliverymodeuser.user_id
            WHERE
            api_puser.id != api_useremailpreference.user_id AND
            api_puser.date_joined >= %s
        ) as temp
        GROUP BY user_id, matched_user_id
        ORDER BY user_id, first_name, last_name;
        """,
        [one_month_ago, one_month_ago, one_month_ago, one_month_ago, one_month_ago]
    )

    # get dictionary containing the newsletter contents of all subscribed users
    user_emails = build_emails(projects_matching_preferences, users_matching_preferences)

    # get the email addresses of each subscribed user
    user_ids = list(user_emails.keys())
    users = PUser.public_objects.filter(pk__in=user_ids)

    # send email to each subscribed user
    for user in users:
        plaintext = get_template("newsletter.txt")
        htmly = get_template("newsletter.html")
        month = current_date.strftime('%B')
        subject = "PRYDE Connect %s Newsletter" % month
        from_email = "noreply-prydeconnect@cornell.edu"
        to = user.email

        data = {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "content": user_emails[user.id]
        }

        text_content = plaintext.render(data)
        html_content = htmly.render(data)

        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)
