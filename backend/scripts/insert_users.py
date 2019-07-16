import requests
import json


class User:

    def __init__(self, role, display_role, affiliation, location, email, phone, website,
                 researchInterests, researchDescription, roles, ageRanges, youthProgramTypes, deliveryModes,
                 researchNeeds, evaluationNeeds):
        self.role = role
        self.display_role = display_role
        self.affiliation = affiliation
        self.location = location
        self.email = email
        self.phone = phone
        self.website = website
        self.researchInterests = researchInterests
        self.researchDescription = researchDescription
        self.roles = roles
        self.ageRanges = ageRanges
        self.youthProgramTypes = youthProgramTypes
        self.deliveryModes = deliveryModes
        self.researchNeeds = researchNeeds
        self.evaluationNeeds = evaluationNeeds

def pump_into_servers():
    #
    # user1 = User("role", "display role", "affiliation", "location", "email", "phone", "website",
    #              "research interests", "research description", "roles", "age ranges",
    #              "youth program types", "delivery modes", "research Needs", "evaluation needs")


    user1 = {
        'email': 'test@gmail.com',
        'password1': 'Kimber3915',
        'password2': 'Kimber3915',
        'first_name': 'test',
        'last_name': 'user'
    }

    url = 'https://localhost:8000/api/v1/rest-auth/registration/'
    headers = {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
    }

    response = requests.request("POST", url, data=json.dumps(user1), headers=headers)
    print(response)

# pump_into_servers()

