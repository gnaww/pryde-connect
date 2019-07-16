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
        self.researchInterests = researchInterests
        self.researchDescription = researchDescription
        self.roles = roles
        self.ageRanges = ageRanges
        self.youthProgramTypes = youthProgramTypes
        self.deliveryModes = deliveryModes
        self.researchNeeds = researchNeeds
        self.evaluationNeeds = evaluationNeeds


# def pump_into_servers():
#
#     url = "https://localhost:8000/api/v1/rest-auth/resgistration/"
#     headers = {
#         'Content-Type': "application/json",
#         'cache-control': "no-cache",
#     }
#
#     for i, art in enumerate(articles):
#         payload = {
#             'source': art.source,
#             'source_name': art.source_name,
#             'author': str(art.author),
#             'title': art.title,
#             'description': art.description,
#             'url': 'https://noozit-times-frontend.herokuapp.com/article/' + (str(i + 1)) + '/',
#             'url_to_image': art.url_image,
#             'publish_time': art.publish_time,
#             'content': art.content
#
#         }
#         # print(i)
#         # print(art)
#
#         response = requests.request("POST", url, data=json.dumps(payload), headers=headers)
#
#         print(response)
#         print(response.text)
#
#
# pump_into_servers()

