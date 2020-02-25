from rest_framework import generics, status
from .serializers import CollaboratorSerializer, CollaboratorSearchSerializer
from .models import Project, PUser, Collaborator
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
# custom permissions
from .permissions import CanEditCollaborators, IsCollaborator
import logging

logger = logging.getLogger(__name__)


# Retrieve collaborators associated with project with id kwargs['pk']
class GetProjectCollaborators(generics.RetrieveAPIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        if not Project.objects.filter(pk=kwargs['pk'], isApproved=True).exists():
            return Response({'message': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)

        project = Project.objects.get(pk=kwargs['pk'], isApproved=True)
        collaborators = Collaborator.objects.filter(project=project)
        serializer = CollaboratorSerializer(collaborators, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


# Add collaborator to project with id kwargs['pk']
class AddCollaborator(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [CanEditCollaborators & IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # get the project we need to check the permissions on
        try:
            obj = Project.objects.get(pk=kwargs['pk'], isApproved=True)
        except Exception as e:
            print(e)
            return Response({'message': 'Project not found.'},
                            status=status.HTTP_404_NOT_FOUND)

        # check to see if user making request has proper the proper permissions
        # error is thrown if they do not have permissions
        self.check_object_permissions(request, obj)

        try:
            # owner of the project should not be able to add themselves as a collaborator
            if obj.owner == PUser.public_objects.get(pk=request.data['user']):
                return Response({'message': 'The owner of the project cannot be added as a collaborator.'}, status=status.HTTP_400_BAD_REQUEST)

            requested_project = Project.objects.get(pk=kwargs['pk'], isApproved=True)
            user = PUser.public_objects.get(pk=request.data['user'])

            # check to see if the user has already been added as a collaborator to this project
            if Collaborator.objects.filter(project=requested_project, collaborator=user).exists():
                return Response({'message': 'This user is already a collaborator.'}, status=status.HTTP_400_BAD_REQUEST)

            Collaborator.objects.create(
                project=requested_project,
                collaborator=user,
                editPermission=request.data['editPermission'],
                deletePermission=request.data['deletePermission'],
                editCollaboratorsPermission=request.data['editCollaboratorsPermission']
            )

            return Response({'message': 'Collaborator successfully added.'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.exception("Error while adding collaborator")
            print(e)
            return Response({'message': 'Something went wrong while adding a collaborator.'}, status=status.HTTP_400_BAD_REQUEST)


# Update the project permissions a collaborator has (editing, deleting, editing collaborators)
class UpdateCollaboratorPermissions(generics.UpdateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [CanEditCollaborators & IsAuthenticated]

    def put(self, request, *args, **kwargs):
        try:
            obj = Project.objects.get(pk=kwargs['pk'], isApproved=True)
        except Exception as e:
            print(e)
            return Response({'message': 'Project not found.'},
                            status=status.HTTP_404_NOT_FOUND)

        self.check_object_permissions(request, obj)

        try:
            requested_project = Project.objects.get(pk=kwargs['pk'], isApproved=True)
            user = PUser.public_objects.get(pk=request.data['user'])

            # check if user with id request.data['user'] is a collaborator on the project
            if Collaborator.objects.filter(project=requested_project, collaborator=user).exists():
                collaborator = Collaborator.objects.get(project=requested_project, collaborator=user)
                collaborator.editPermission = request.data['editPermission']
                collaborator.deletePermission = request.data['deletePermission']
                collaborator.editCollaboratorsPermission = request.data['editCollaboratorsPermission']
                collaborator.save()

                return Response({'message': 'Collaborator permissions successfully updated.'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'This user is not a collaborator.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            logger.exception("Error while updating collaborator permissions")
            print(e)
            return Response({'message': 'Something went wrong while updating collaborator permissions.'}, status=status.HTTP_400_BAD_REQUEST)


# Delete collaborator from project with id kwargs['pk']
class DeleteCollaborator(generics.DestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [CanEditCollaborators & IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        try:
            obj = Project.objects.get(pk=kwargs['pk'], isApproved=True)
        except Exception as e:
            print(e)
            return Response({'message': 'Project not found.'},
                            status=status.HTTP_404_NOT_FOUND)

        self.check_object_permissions(request, obj)

        try:
            requested_project = Project.objects.get(pk=kwargs['pk'], isApproved=True)
            user = PUser.public_objects.get(pk=request.data['user'])

            # check if user with id request.data['user'] is a collaborator on the project
            if Collaborator.objects.filter(project=requested_project, collaborator=user).exists():
                Collaborator.objects.get(project=requested_project, collaborator=user).delete()

                return Response({'message': 'Collaborator successfully deleted.'}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'message': 'This user is not a collaborator.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            logger.exception("Error while deleting collaborator")
            print(e)
            return Response({'message': 'Something went wrong while deleting the collaborator.'}, status=status.HTTP_400_BAD_REQUEST)


# Toggles visibility of project on user's profile
# showProjectOnProfile == true means public, showProjctOnProfile == false means private
# If user selects the project to be private, it will only be visible on their profile when logged in
class ToggleProjectVisibility(generics.UpdateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsCollaborator]

    def put(self, request, *args, **kwargs):
        try:
            obj = Project.objects.get(pk=kwargs['pk'], isApproved=True)
        except Exception as e:
            print(e)
            return Response({'message': 'Project not found.'},
                            status=status.HTTP_404_NOT_FOUND)
        self.check_object_permissions(request, obj)

        try:
            collaborator = Collaborator.objects.get(collaborator=request.user, project=obj)
            collaborator.showProjectOnProfile = not collaborator.showProjectOnProfile
            collaborator.save()

            return Response({'message': 'Your preferences have been saved.'}, status=status.HTTP_200_OK)

        except Exception as e:
            logger.exception("Error while updating user email preferences")
            print(e)
            return Response({'message': 'Something went wrong while updating your preferences.'}, status=status.HTTP_400_BAD_REQUEST)


# Get the permissions the logged in user has for project with id kwargs['pk']
class LoggedInUserPermissions(generics.RetrieveAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            obj = Project.objects.get(pk=kwargs['pk'], isApproved=True)
        except Exception as e:
            print(e)
            return Response({'message': 'Project not found.'},
                            status=status.HTTP_404_NOT_FOUND)

        self.check_object_permissions(request, obj)

        try:
            logged_in_user = PUser.public_objects.get(pk=request.user.pk)

            # logged in user is owner of project
            if (obj.owner == logged_in_user):
                return Response(
                    {
                        'editPermission': True,
                        'deletePermission': True,
                        'editCollaboratorsPermission': True,
                        'isCollaborator': False,
                        'showProjectOnProfile': None
                    },
                    status=status.HTTP_200_OK
                )
            else:
                # logged in user is a collaborator on project, return their collaborator permissions
                if Collaborator.objects.filter(project=obj, collaborator=logged_in_user).exists():
                    collaborator = Collaborator.objects.get(project=obj, collaborator=logged_in_user)

                    return Response(
                        {
                            'editPermission': collaborator.editPermission,
                            'deletePermission': collaborator.deletePermission,
                            'editCollaboratorsPermission': collaborator.editCollaboratorsPermission,
                            'isCollaborator': True,
                            'showProjectOnProfile': collaborator.showProjectOnProfile
                        },
                        status=status.HTTP_200_OK
                    )
                # logged in user is neither an owner nor collaborator on project, has no permissions
                else:
                    return Response(
                        {
                            'editPermission': False,
                            'deletePermission': False,
                            'editCollaboratorsPermission': False,
                            'isCollaborator': False,
                            'showProjectOnProfile': None
                        },
                        status=status.HTTP_200_OK
                    )
        except Exception as e:
            logger.exception("Error while retrieving logged in user's project permissions")
            print(e)
            return Response({'message': 'Something went wrong while getting logged in user\'s permissions.'}, status=status.HTTP_400_BAD_REQUEST)


# Endpoint for searching users by email address, used in searching for users to add as a collaborator
class SearchCollaborators(generics.ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # By default return all users in database
        if ('q' not in request.query_params) or request.query_params['q'] == '':
            results = PUser.public_objects.all()
            results = results.exclude(pk=request.user.pk)
            serializer = CollaboratorSearchSerializer(results, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            results = PUser.public_objects.filter(email__icontains=request.query_params['q'])
            results = results.exclude(pk=request.user.pk)
            serializer = CollaboratorSearchSerializer(results, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)
