from rest_framework import permissions
from .models import PUser, Project, Collaborator
import requests, os

class CanEditCollaborators(permissions.BasePermission):
    message = "You do not have permission to edit collaborators on this project."

    def has_object_permission(self, request, view, obj):
        try:
            hasPermission = Collaborator.objects.get(project=obj, collaborator=request.user).editCollaboratorsPermission

        except Exception as e:
            hasPermission = False

        # Instance must have an attribute named `owner`.
        return hasPermission or (obj.owner == request.user)


class CanDeleteProject(permissions.BasePermission):
    message = "You do not have permission to delete this project."

    def has_object_permission(self, request, view, obj):
        try:
           hasPermission = Collaborator.objects.get(project=obj, collaborator=request.user).deletePermission

        except Exception as e:
            hasPermission = False

        # Instance obj must have an attribute named `owner`.
        return (obj.owner == request.user) or hasPermission


class CanEditProject(permissions.BasePermission):
    message = "You do not have permission to make edits on this project."

    def has_object_permission(self, request, view, obj):
        try:
            hasPermission = Collaborator.objects.get(project=obj, collaborator=request.user).editPermission

        except Exception as e:
            hasPermission = False

        # Instance obj must have an attribute named `owner`.
        return (obj.owner == request.user) or hasPermission


class IsCollaborator(permissions.BasePermission):
    message = "You do not have permission to toggle project visibility for this collaborator."

    def has_object_permission(self, request, view, obj):
        return Collaborator.objects.filter(project=obj, collaborator=request.user).exists()


class CanEditDeleteUser(permissions.BasePermission):
    message = "You do not have permission to edit or delete this user."

    def has_object_permission(self, request, view, obj):
        return obj == request.user


class isRealUser(permissions.BasePermission):
    message = "RECAPTCHA has detected you are a robot."

    def has_permission(self, request, view):
        data = {
            'secret': os.getenv("RECAPTCHA_SECRET_DEV_KEY"), # TODO: use production key
            'response': request.data['RECAPTCHAToken']
        }
        r = requests.post(url="https://www.google.com/recaptcha/api/siteverify", data=data)
        responseJSON = r.json()
        return responseJSON['success']
