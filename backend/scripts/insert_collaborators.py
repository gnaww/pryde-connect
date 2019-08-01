import requests
import json
import random


def login_user():

    url = 'http://localhost:8000/api/v1/rest-auth/login/'
    headers = {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
    }

    login = {
        'email': 'barronfran@gmail.com',
        'password': 'password'
    }
    response = requests.request("POST", url, data=json.dumps(login), headers=headers)
    return response.json()['key']


def get_projects_from_user():
    key = login_user()
    url = 'http://localhost:8000/api/v1/user/'
    headers = {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
        'Authorization': 'Token ' + key
    }
    response = requests.request("GET", url, headers=headers)
    # print(response.json())
    projects = response.json()['projects']
    project_ids = []
    for project in projects:
        project_ids.append(project['pk'])

    return project_ids, key


def get_list_users():
    url = 'http://localhost:8000/api/v1/users/'
    users = requests.request("GET", url).json()

    user_ids = [users[0]['pk'], users[1]['pk'], users[2]['pk'], users[3]['pk'], users[4]['pk'] ]

    return user_ids


def add_collaborators():
    user_ids = get_list_users()
    tuple = get_projects_from_user()
    project_ids = tuple[0]
    key = tuple[1]

    headers = {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
        'Authorization': 'Token ' + key
    }

    for project in project_ids:

        for user in user_ids:

            url = 'http://localhost:8000/api/v1/project/' + str(project) + '/collaborator/add/'
            body = {
                'user': user,
                'editPermission': random.choice([True, False]),
                'deletePermission': random.choice([True, False]),
                'editCollaboratorsPermission': random.choice([True, False])
            }

            print(requests.request("POST", url, data=json.dumps(body), headers=headers).json())


add_collaborators()
