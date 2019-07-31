from rest_framework import permissions
from .models import PUser, Project, Collaborator


class CanAddCollaborator(permissions.BasePermission):
    message = "You do not have permission to add collaborators to this project."


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
        print(request.user)
        print(obj.owner)
        # Instance must have an attribute named `owner`.

        try:
            hasPermission = Collaborator.objects.get(project=obj, collaborator=request.user).addCollaboratorPermission

        except Exception as e:
            hasPermission = False

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
    message = "You do not have permission to make edits on this project."

    def has_object_permission(self, request, view, obj):

        # Instance obj must have an attribute named `owner`.
        return Collaborator.objects.filter(project=obj, collaborator=request.user).exists()

class CanEditDeleteUser(permissions.BasePermission):
    message = "You do not have permission to edit or delete this user."

    def has_object_permission(self, request, view, obj):
        return obj == request.user
