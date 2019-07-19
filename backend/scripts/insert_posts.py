import requests
import json


def login_user():

    url = 'http://localhost:8000/api/v1/rest-auth/login/'
    headers = {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
    }

    login = {
        'email': 'test1111@gmail.com',
        'password': 'Kimber3915'
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
        "name": "My Frist Study",
        "status": 2,
        "summary": "summary about the project",
        "researchTopics": ["website building"],
        "ageRanges": ["19-22"],
        "deliveryModes": ["aslkdjf", "alkdsjf", "oiweur"],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": ["none"],
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": []
    }

    project2 = {
        "name": "My Frist Study",
        "status": 2,
        "summary": "summary about the project",
        "researchTopics": ["website building"],
        "ageRanges": ["19-22"],
        "deliveryModes": ["aslkdjf", "alkdsjf", "oiweur"],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": ["none"],
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": []
    }

    project3 = {
        "name": "My Frist Study",
        "status": 2,
        "summary": "summary about the project",
        "researchTopics": ["website building"],
        "ageRanges": ["19-22"],
        "deliveryModes": ["aslkdjf", "alkdsjf", "oiweur"],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": ["none"],
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": []
    }

    project4 = {
        "name": "My Frist Study",
        "status": 2,
        "summary": "summary about the project",
        "researchTopics": ["website building"],
        "ageRanges": ["19-22"],
        "deliveryModes": ["aslkdjf", "alkdsjf", "oiweur"],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": ["none"],
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": []
    }

    project5 = {
        "name": "My Frist Study",
        "status": 2,
        "summary": "summary about the project",
        "researchTopics": ["website building"],
        "ageRanges": ["19-22"],
        "deliveryModes": ["aslkdjf", "alkdsjf", "oiweur"],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": ["none"],
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": []
    }

    project6 = {
        "name": "My Frist Study",
        "status": 2,
        "summary": "summary about the project",
        "researchTopics": ["website building"],
        "ageRanges": ["19-22"],
        "deliveryModes": ["aslkdjf", "alkdsjf", "oiweur"],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": ["none"],
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": []
    }

    project7 = {
        "name": "My Frist Study",
        "status": 2,
        "summary": "summary about the project",
        "researchTopics": ["website building"],
        "ageRanges": ["19-22"],
        "deliveryModes": ["aslkdjf", "alkdsjf", "oiweur"],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": ["none"],
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": []
    }

    project8 = {
        "name": "My Frist Study",
        "status": 2,
        "summary": "summary about the project",
        "researchTopics": ["website building"],
        "ageRanges": ["19-22"],
        "deliveryModes": ["aslkdjf", "alkdsjf", "oiweur"],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": ["none"],
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": []
    }

    project9 = {
        "name": "My Frist Study",
        "status": 2,
        "summary": "summary about the project",
        "researchTopics": ["website building"],
        "ageRanges": ["19-22"],
        "deliveryModes": ["aslkdjf", "alkdsjf", "oiweur"],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": ["none"],
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": []
    }

    project10 = {
        "name": "My Frist Study",
        "status": 2,
        "summary": "summary about the project",
        "researchTopics": ["website building"],
        "ageRanges": ["19-22"],
        "deliveryModes": ["aslkdjf", "alkdsjf", "oiweur"],
        "timeline": "May to August",
        "commitmentLength": "build a website",
        "incentives": ["none"],
        # "collaborators": [],
        "additionalInformation": "django and react",
        "additionalFiles": []
    }

    projects = [project1, project2, project3, project4, project5, project6, project7, project8, project9, project10]

    for project in projects:
        response = requests.request("POST", url, data=json.dumps(project), headers=headers)
        print(response)


insert_posts()

