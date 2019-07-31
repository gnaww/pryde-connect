import requests
import json
import random

projectNames = ['Children', 'Technology', 'Animals', 'Science', 'Reading', 'Engagement']


researchTopics = ['Animal Science & Agriculture', 'Civic Engagement',
           'Diversity Equity & Inclusion', 'Education & Learning',
           'Environment & Sustainability', 'Families',
           'Health & Wellness', 'Peer Relationships',
           'Positive Youth Development', 'Policy Analysis',
           'Program Evaluation', 'Media & Technology',
           'Motivation', 'Nutrition', 'Risk Behavior',
           'Self & Identity', 'Science Technology Engineering & Math (STEM)',
           'Youth/Adult Relationships', 'Other']


deliveryModes = ['Afterschool', 'Camps', 'Clubs', 'Other']

ageRanges = ['Infants (0-1 year)', 'Toddlers (1-2 years)',
             'Toddlers (2-3 years)', 'Preschoolers (3-5 years)',
             'Early childhood (6-8 years)', 'Middle childhood (9-11 years)',
             'Young teens (12-14 years)', 'Teenagers (15-17 years)',
             'Young adults (18-24 years)']


def login_users():

    emails = ['barronfran@gmail.com', 'dubois.barron@gmail.com', 'william.oliver.wang@gmail.com',
              'test4@gmail.com', 'test5@gmail.com', 'test6@gmail.com', 'test7@gmail.com',
              'test8@gmail.com', 'test9@gmail.com', 'test10@gmail.com']

    url = 'http://localhost:8000/api/v1/rest-auth/login/'
    headers = {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
    }

    keys = []
    for email in emails:
        login = {
            'email': email,
            'password': 'password'
        }
        response = requests.request("POST", url, data=json.dumps(login), headers=headers)
        print(response)
        keys.append(response.json()['key'])

    return keys


def make_projects(n):
    print(n)
    projects = []
    for num in range(n):
        projects.append({
            "name": random.choice(projectNames),
            "status": random.choice([1, 2, 3]),
            "summary": "summary about the project",
            "researchTopics": [random.choice(researchTopics), random.choice(researchTopics),
                               random.choice(researchTopics)],
            "ageRanges": [random.choice(ageRanges), random.choice(ageRanges)],
            "deliveryModes": [random.choice(deliveryModes), random.choice(deliveryModes)],
            "timeline": "May to August",
            "commitmentLength": "build a website",
            "incentives": "none",
            # "collaborators": [],
            "additionalInformation": "django and react",
            # "additionalFiles": [],
            "alternateContact": {},
            "alternateLocation": ""
        })
    return projects


def insert_posts():

    auth_keys = login_users()
    print(auth_keys)
    url = 'http://localhost:8000/api/v1/project/create/'
    for key in auth_keys:
        # give each user between 2 and 4 projects
        headers = {
            'Authorization': 'Token ' + key,
            'Content-Type': 'application/json',
            'cache-control': 'no-cache'
        }
        num_projects = random.choice([2, 3, 4])
        projects = make_projects(num_projects)
        for project in projects:
            response = requests.request("POST", url, data=json.dumps(project), headers=headers)
            print(response)


insert_posts()

