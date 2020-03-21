from rest_framework import permissions
from .models import PUser, Project, Collaborator
import requests, os
import logging

logger = logging.getLogger(__name__)


# Check if user has permissions to add, remove, or update permissions of the collaborators on a project
class CanEditCollaborators(permissions.BasePermission):
    message = "You do not have permission to edit collaborators on this project."

    def has_object_permission(self, request, view, obj):
        try:
            hasPermission = Collaborator.objects.get(project=obj, collaborator=request.user).editCollaboratorsPermission

        # user isn't found as a collaborator, has no permissions
        except Exception as e:
            hasPermission = False

        # Instance must have an attribute named `owner`.
        return hasPermission or (obj.owner == request.user)


# Chck if user has permissions to delete the project
class CanDeleteProject(permissions.BasePermission):
    message = "You do not have permission to delete this project."

    def has_object_permission(self, request, view, obj):
        try:
           hasPermission = Collaborator.objects.get(project=obj, collaborator=request.user).deletePermission

        # user isn't found as a collaborator, has no permissions
        except Exception as e:
            hasPermission = False

        # Instance obj must have an attribute named `owner`.
        return (obj.owner == request.user) or hasPermission


# Check if user has permissions to edit the project
class CanEditProject(permissions.BasePermission):
    message = "You do not have permission to make edits on this project."

    def has_object_permission(self, request, view, obj):
        try:
            hasPermission = Collaborator.objects.get(project=obj, collaborator=request.user).editPermission

        # user isn't found as a collaborator, has no permissions
        except Exception as e:
            hasPermission = False

        # Instance obj must have an attribute named `owner`.
        return (obj.owner == request.user) or hasPermission


# Check if user is the collaborator changing project visibility
class IsCollaborator(permissions.BasePermission):
    message = "You do not have permission to toggle project visibility for this collaborator."

    def has_object_permission(self, request, view, obj):
        return Collaborator.objects.filter(project=obj, collaborator=request.user).exists()


# Check if user has permission to edit or delete the account
class CanEditDeleteUser(permissions.BasePermission):
    message = "You do not have permission to edit or delete this user."

    def has_object_permission(self, request, view, obj):
        return obj == request.user


# Check if user passes RECAPTCHA verification
class isRealUser(permissions.BasePermission):
    message = "RECAPTCHA has detected you are a robot."

    def has_permission(self, request, view):
        data = {
            'secret': os.getenv("RECAPTCHA_SECRET_DEV_KEY"),
            'response': request.data['RECAPTCHAToken']
        }
        r = requests.post(url="https://www.google.com/recaptcha/api/siteverify", data=data)
        responseJSON = r.json()

        if not responseJSON['success']:
            logger.error("Error verifying RECAPTCHA: {} {} {}".format(responseJSON['challenge_ts'], responseJSON['hostname'], responseJSON['error-codes']))

        return responseJSON['success']
