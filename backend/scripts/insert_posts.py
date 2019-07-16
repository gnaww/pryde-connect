import requests
import json


def login_user():

    url = 'localhost:8000/api/v1/rest-auth/login'
    headers = {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
    }

    login = {
        'email': 'testuser@gmail.com',
        'password': 'Kimber3915'
    }
    response = requests.request("POST", url, data=json.dumps(login), headers=headers)
    return response


def insert_posts():
    auth_key = login_user()
    print(auth_key)


insert_posts()

