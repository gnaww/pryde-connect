import requests
import json


class User:

    def __init__(self, role, display_role, affiliation, location, email, phone, website,
                 researchInterests, researchDescription, roles, ageRanges, deliveryModes,
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
        self.deliveryModes = deliveryModes
        self.researchNeeds = researchNeeds
        self.evaluationNeeds = evaluationNeeds


def pump_into_servers():
    url = 'http://localhost:8000/api/v1/rest-auth/registration/'
    headers = {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
    }

    user1 = {
        "email": "test1111@gmail.com",
        "password1": "Kimber3915",
        "password2": "Kimber3915",
        "first_name": "test",
        "last_name": "user1",
        "role": 1,
        "displayRole": "Practice Focused Role",
        "affiliation": "cornell university",
        "location": "ithaca, NY",
        "phone": "+14432232248",
        "website": "http://www.google.com",
        "researchDescription": "i love doing research",
        "roles": ["string1", "string2", "string3"],
        "ageRanges": ["3-5", "7-10"],
        "researchInterests": ["ahsdfkl", "alsdkf"],
        "deliveryModes": ["laskjfd", "aldskjf"],
        "researchNeeds": "this is a research need!",
        "evaluationNeeds": "this is an evaluation need!",
        "locatedAtCornell": False,
        "locatedAtCCE": False
    }

    user2 = {
        "email": "test22222@gmail.com",
        "password1": "Kimber3915",
        "password2": "Kimber3915",
        "first_name": "test",
        "last_name": "user1",
        "role": 1,
        "displayRole": "Practice Focused Role",
        "affiliation": "cornell university",
        "location": "ithaca, NY",
        "phone": "+14432232248",
        "website": "http://www.google.com",
        "researchDescription": "i love doing research",
        "roles": ["string1", "string2", "string3"],
        "ageRanges": ["3-5", "7-10"],
        "researchInterests": ["ahsdfkl", "alsdkf"],
        "deliveryModes": ["laskjfd", "aldskjf"],
        "researchNeeds": "this is a research need!",
        "evaluationNeeds": "this is an evaluation need!",
        "locatedAtCornell": False,
        "locatedAtCCE": False
    }

    user3 = {
        "email": "test33333@gmail.com",
        "password1": "Kimber3915",
        "password2": "Kimber3915",
        "first_name": "test",
        "last_name": "user",
        "role": 1,
        "displayRole": "Other CCE Role",
        "affiliation": "cornell university",
        "location": "ithaca, NY",
        "phone": "+14432232248",
        "website": "http://www.google.com",
        "researchDescription": "i love doing research",
        "roles": ["string1", "string2", "string3"],
        "ageRanges": ["3-5", "7-10"],
        "researchInterests": ["ahsdfkl", "alsdkf"],
        "deliveryModes": ["laskjfd", "aldskjf"],
        "researchNeeds": "this is a research need!",
        "evaluationNeeds": "this is an evaluation need!",
        "locatedAtCornell": False,
        "locatedAtCCE": True
    }

    user4 = {
        "email": "test44444@gmail.com",
        "password1": "Kimber3915",
        "password2": "Kimber3915",
        "first_name": "test",
        "last_name": "user",
        "role": 2,
        "displayRole": "Research Focused Role",
        "affiliation": "cornell university",
        "location": "ithaca, NY",
        "phone": "+14432232248",
        "website": "http://www.google.com",
        "researchDescription": "i love doing research",
        "roles": ["string1", "string2", "string3"],
        "ageRanges": ["3-5", "7-10"],
        "researchInterests": ["ahsdfkl", "alsdkf"],
        "deliveryModes": ["laskjfd", "aldskjf"],
        "researchNeeds": "this is a research need!",
        "evaluationNeeds": "this is an evaluation need!",
        "locatedAtCornell": True,
        "locatedAtCCE": False
    }

    user5 = {
        "email": "test55555@gmail.com",
        "password1": "Kimber3915",
        "password2": "Kimber3915",
        "first_name": "test",
        "last_name": "user",
        "role": 2,
        "displayRole": "Research Focused Role",
        "affiliation": "cornell university",
        "location": "ithaca, NY",
        "phone": "+14432232248",
        "website": "http://www.google.com",
        "researchDescription": "i love doing research",
        "roles": ["string1", "string2", "string3"],
        "ageRanges": ["3-5", "7-10"],
        "researchInterests": ["ahsdfkl", "alsdkf"],
        "deliveryModes": ["laskjfd", "aldskjf"],
        "researchNeeds": "this is a research need!",
        "evaluationNeeds": "this is an evaluation need!",
        "locatedAtCornell": True,
        "locatedAtCCE": False
    }

    user6 = {
        "email": "test6666@gmail.com",
        "password1": "Kimber3915",
        "password2": "Kimber3915",
        "first_name": "test",
        "last_name": "user",
        "role": 2,
        "displayRole": "Research Focused Role",
        "affiliation": "cornell university",
        "location": "ithaca, NY",
        "phone": "+14432232248",
        "website": "http://www.google.com",
        "researchDescription": "i love doing research",
        "roles": ["string1", "string2", "string3"],
        "ageRanges": ["3-5", "7-10"],
        "researchInterests": ["ahsdfkl", "alsdkf"],
        "deliveryModes": ["laskjfd", "aldskjf"],
        "researchNeeds": "this is a research need!",
        "evaluationNeeds": "this is an evaluation need!",
        "locatedAtCornell": True,
        "locatedAtCCE": False
    }

    user7 = {
        "email": "test777@gmail.com",
        "password1": "Kimber3915",
        "password2": "Kimber3915",
        "first_name": "test",
        "last_name": "user",
        "role": 2,
        "displayRole": "Research Focused Role",
        "affiliation": "cornell university",
        "location": "ithaca, NY",
        "phone": "+14432232248",
        "website": "http://www.google.com",
        "researchDescription": "i love doing research",
        "roles": ["string1", "string2", "string3"],
        "ageRanges": ["3-5", "7-10"],
        "researchInterests": ["ahsdfkl", "alsdkf"],
        "deliveryModes": ["laskjfd", "aldskjf"],
        "researchNeeds": "this is a research need!",
        "evaluationNeeds": "this is an evaluation need!",
        "locatedAtCornell": True,
        "locatedAtCCE": False
    }

    user8 = {
        "email": "test8888@gmail.com",
        "password1": "Kimber3915",
        "password2": "Kimber3915",
        "first_name": "test",
        "last_name": "user",
        "role": 2,
        "displayRole": "Research Focused Role",
        "affiliation": "cornell university",
        "location": "ithaca, NY",
        "phone": "+14432232248",
        "website": "http://www.google.com",
        "researchDescription": "i love doing research",
        "roles": ["string1", "string2", "string3"],
        "ageRanges": ["3-5", "7-10"],
        "researchInterests": ["ahsdfkl", "alsdkf"],
        "deliveryModes": ["laskjfd", "aldskjf"],
        "researchNeeds": "this is a research need!",
        "evaluationNeeds": "this is an evaluation need!",
        "locatedAtCornell": True,
        "locatedAtCCE": False
    }

    user9 = {
        "email": "test9999@gmail.com",
        "password1": "Kimber3915",
        "password2": "Kimber3915",
        "first_name": "test",
        "last_name": "user",
        "role": 2,
        "displayRole": "Research Focused Role",
        "affiliation": "cornell university",
        "location": "ithaca, NY",
        "phone": "+14432232248",
        "website": "http://www.google.com",
        "researchDescription": "i love doing research",
        "roles": ["string1", "string2", "string3"],
        "ageRanges": ["3-5", "7-10"],
        "researchInterests": ["ahsdfkl", "alsdkf"],
        "deliveryModes": ["laskjfd", "aldskjf"],
        "researchNeeds": "this is a research need!",
        "evaluationNeeds": "this is an evaluation need!",
        "locatedAtCornell": True,
        "locatedAtCCE": False
    }

    user10 = {
        "email": "test101010@gmail.com",
        "password1": "Kimber3915",
        "password2": "Kimber3915",
        "first_name": "test",
        "last_name": "user",
        "role": 2,
        "displayRole": "Research Focused Role",
        "affiliation": "Rutgers University",
        "location": "New Brunswick, NJ",
        "phone": "+14432232248",
        "website": "http://www.google.com",
        "researchDescription": "i love doing research",
        "roles": ["string1", "string2", "string3"],
        "ageRanges": ["3-5", "7-10"],
        "researchInterests": ["ahsdfkl", "alsdkf"],
        "deliveryModes": ["laskjfd", "aldskjf"],
        "researchNeeds": "this is a research need!",
        "evaluationNeeds": "this is an evaluation need!",
        "locatedAtCornell": False,
        "locatedAtCCE": False
    }

    users = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10]

    for user in users:
        response = requests.request("POST", url, data=json.dumps(user), headers=headers)
        print(response)

pump_into_servers()

