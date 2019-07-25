import requests
import json
import random

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



def login_user():

    url = 'http://localhost:8000/api/v1/rest-auth/login/'
    headers = {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
    }

    login = {
        'email': 'test1@gmail.com',
        'password': 'password'
    }
    response = requests.request("POST", url, data=json.dumps(login), headers=headers)
    return response.json()['key']


def insert_posts():
    auth_key = login_user()

    url = 'http://localhost:8000/api/v1/project/create/'
    headers = {
        'Authorization': 'Token ' + auth_key,
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
    }


    project1 = {
        "name": "aaa",
        "status": random.choice([1, 2, 3]),
        "summary": "summary about the project",
        "researchTopics": [random.choice(researchTopics), random.choice(researchTopics), random.choice(researchTopics)],
        "ageRanges": [random.choice(ageRanges), random.choice(ageRanges)],
        "deliveryModes": [random.choice(deliveryModes), random.choice(deliveryModes)],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": "none",
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": [],
        "alternateContact": {},
        "alternateLocation": ""
    }

    project2 = {
        "name": "bb",
        "status": random.choice([1, 2, 3]),
        "summary": "summary about the project",
        "researchTopics": [random.choice(researchTopics), random.choice(researchTopics), random.choice(researchTopics)],
        "ageRanges": [random.choice(ageRanges), random.choice(ageRanges)],
        "deliveryModes": [random.choice(deliveryModes), random.choice(deliveryModes)],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": "none",
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": [],
        "alternateContact": {},
        "alternateLocation": ""
    }

    project3 = {
        "name": "gg",
        "status": random.choice([1, 2, 3]),
        "summary": "summary about the project",
        "researchTopics": [random.choice(researchTopics), random.choice(researchTopics), random.choice(researchTopics)],
        "ageRanges": [random.choice(ageRanges), random.choice(ageRanges)],
        "deliveryModes": [random.choice(deliveryModes), random.choice(deliveryModes)],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": "none",
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": [],
        "alternateContact": {},
        "alternateLocation": ""
    }

    project4 = {
        "name": "zz",
        "status": random.choice([1, 2, 3]),
        "summary": "summary about the project",
        "researchTopics": [random.choice(researchTopics), random.choice(researchTopics), random.choice(researchTopics)],
        "ageRanges": [random.choice(ageRanges), random.choice(ageRanges)],
        "deliveryModes": [random.choice(deliveryModes), random.choice(deliveryModes)],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": "none",
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": [],
        "alternateContact": {},
        "alternateLocation": ""
    }

    project5 = {
        "name": "eee",
        "status": random.choice([1, 2, 3]),
        "summary": "summary about the project",
        "researchTopics": [random.choice(researchTopics), random.choice(researchTopics), random.choice(researchTopics)],
        "ageRanges": [random.choice(ageRanges), random.choice(ageRanges)],
        "deliveryModes": [random.choice(deliveryModes), random.choice(deliveryModes)],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": "none",
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": [],
        "alternateContact": {},
        "alternateLocation": ""
    }

    project6 = {
        "name": "ddd",
        "status": random.choice([1, 2, 3]),
        "summary": "summary about the project",
        "researchTopics": [random.choice(researchTopics), random.choice(researchTopics), random.choice(researchTopics)],
        "ageRanges": [random.choice(ageRanges), random.choice(ageRanges)],
        "deliveryModes": [random.choice(deliveryModes), random.choice(deliveryModes)],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": "none",
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": [],
        "alternateContact": {},
        "alternateLocation": ""
    }

    project7 = {
        "name": "lll",
        "status": random.choice([1, 2, 3]),
        "summary": "summary about the project",
        "researchTopics": [random.choice(researchTopics), random.choice(researchTopics), random.choice(researchTopics)],
        "ageRanges": [random.choice(ageRanges), random.choice(ageRanges)],
        "deliveryModes": [random.choice(deliveryModes), random.choice(deliveryModes)],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": "none",
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": [],
        "alternateContact": {},
        "alternateLocation": ""
    }

    project8 = {
        "name": "asdf",
        "status": random.choice([1, 2, 3]),
        "summary": "summary about the project",
        "researchTopics": [random.choice(researchTopics), random.choice(researchTopics), random.choice(researchTopics)],
        "ageRanges": [random.choice(ageRanges), random.choice(ageRanges)],
        "deliveryModes": [random.choice(deliveryModes), random.choice(deliveryModes)],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": "none",
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": [],
        "alternateContact": {},
        "alternateLocation": ""
    }

    project9 = {
        "name": "foo bar",
        "status": random.choice([1, 2, 3]),
        "summary": "summary about the project",
        "researchTopics": [random.choice(researchTopics), random.choice(researchTopics), random.choice(researchTopics)],
        "ageRanges": [random.choice(ageRanges), random.choice(ageRanges)],
        "deliveryModes": [random.choice(deliveryModes), random.choice(deliveryModes)],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": "none",
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": [],
        "alternateContact": {},
        "alternateLocation": ""
    }

    project10 = {
        "name": "test study",
        "status": random.choice([1, 2, 3]),
        "summary": "summary about the project",
        "researchTopics": [random.choice(researchTopics), random.choice(researchTopics), random.choice(researchTopics)],
        "ageRanges": [random.choice(ageRanges), random.choice(ageRanges)],
        "deliveryModes": [random.choice(deliveryModes), random.choice(deliveryModes)],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": "none",
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": [],
        "alternateContact": {},
        "alternateLocation": ""
    }

    projects = [project1, project2, project3, project4, project5, project6, project7, project8, project9, project10]

    for project in projects:
        response = requests.request("POST", url, data=json.dumps(project), headers=headers)
        print(response)


insert_posts()

