from rest_framework import permissions
from .models import PUser, Project, Collaborators


class CanAddCollaborator(permissions.BasePermission):
    message = 'You do not have permission to add collaborators to this project'

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        # if request.method in permissions.SAFE_METHODS:
        #     return True

        print("HELLO WORLD")
        print("My first custom permission")
        print(request)
        print(view)
        print(obj)
        # Instance must have an attribute named `owner`.

        try:
            hasPermission = Collaborators.objects.get(project=obj, collaborator=request.user).addCollaboratorPermission

        except Exception as e:
            hasPermission = False

        return (obj.owner == request.user) or hasPermission


class CanDeleteProject(permissions.BasePermission):
    message = "You do not have permission to delete this project"

    def has_object_permission(self, request, view, obj):

        try:
           hasPermission = Collaborators.objects.get(project=obj, collaborator=request.user).deletePermission

        except Exception as e:
            hasPermission = False

        # Instance obj must have an attribute named `owner`.
        return (obj.owner == request.user) or hasPermission


class CanEditProject(permissions.BasePermission):
    message = "You do not have permission to make edits on this project"

    def has_object_permission(self, request, view, obj):

        try:
            hasPermission = Collaborators.objects.get(project=obj, collaborator=request.user).editPermission

        except Exception as e:
            hasPermission = False

        # Instance obj must have an attribute named `owner`.
        return (obj.owner == request.user) or hasPermission