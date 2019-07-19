from rest_framework import permissions
from .models import PUser, Project, Collaborators


class CanAddCollaborator(permissions.BasePermission):
    message = 'You cannot add collaborators to this project'

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
            hasCollabPermission = Collaborators.objects.get(project=obj, collaborator=request.user).addCollaboratorPermission

        except Exception as e:
            hasCollabPermission = False

        return (obj.owner == request.user) or hasCollabPermission


class CanDeleteProject(permissions.BasePermission):
    message = "You do not have permission to delete this!!"

    def has_object_permission(self, request, view, obj):
        #
        # print("HELLO WORLD")
        # print("My first custom permission")
        # print(request)
        # print(view)
        # print(obj.owner)
        # print(request.user)

        # get the collaborators on the project
        try:
           hasCollabPermission = Collaborators.objects.get(project=obj, collaborator=request.user).deletePermission

        except Exception as e:
            hasCollabPermission = False

        # Instance obj must have an attribute named `owner`.
        return (obj.owner == request.user) or hasCollabPermission
