from rest_framework import generics, status
from .serializers import ProjectSerializer, ProjectShortSerializer, UserSerializer,\
    UserShortSerializer, UserUpdateSerializer, ProjectUpdateSerializer, UserCollaboratorSerializer
from .models import Project, PUser, Collaborator
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

# custom permissions
from .permissions import CanAddCollaborator, CanDeleteProject, CanEditDeleteUser, CanEditProject, IsCollaborator

# gets and returns the list
class GetCollaboratorsFromProject(generics.RetrieveAPIView):

    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):


        print(args)
        print(kwargs)
        print(request)
        if not Project.objects.filter(pk=kwargs['pk']).exists():
            return Response({'message': 'Project not found'})

        project = Project.objects.get(pk=kwargs['pk'])
        print(project.owner)

        collaborators = Collaborator.objects.filter(project=kwargs['pk'])

        serializer = UserCollaboratorSerializer(collaborators, many=True)

        return Response(data=serializer.data)



class AddCollaborator(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication]
    # with addCollaboratorPermission should be allowed to do this
    permission_classes = [CanAddCollaborator & IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # get the object we need to check the permissions on
        try:
            obj = Project.objects.get(pk=kwargs['pk'])
        except Exception as e:
            print(e)
            return Response({'message': 'Project not found.'},
                            status=status.HTTP_400_BAD_REQUEST)


        # check to see if they have proper permission to perform this request
        # this will throw an error if they do not have permissions
        self.check_object_permissions(request, obj)

        try:
            # the owner of the project should not be able to add themselves as a collaborator
            if obj.owner == PUser.objects.get(pk=request.data['user']):
                return Response({'message': 'You cannot add yourself as a collaborator.'}, status=status.HTTP_400_BAD_REQUEST)

            # user shouldn't be able to add themselves as a collaborator to a project that they own

            # check to see if the user is already added as a collaborator to this project
            if Collaborator.objects.filter(project=Project.objects.get(pk=kwargs['pk']),
                                         collaborator=PUser.objects.get(pk=request.data['user'])).exists():
                return Response({'message': 'This user is already a collaborator.'}, status=status.HTTP_400_BAD_REQUEST)

            Collaborator.objects.create(project=Project.objects.get(pk=kwargs['pk']),
                                         collaborator=PUser.objects.get(pk=request.data['user']),
                                         editPermission=request.data['editPermission'],
                                         deletePermission=request.data['deletePermission'],
                                         addCollaboratorPermission=request.data['addCollaboratorPermission'])

            return Response({'message': 'Collaborator successfully added.'}, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({'message': 'Something went wrong while adding a collaborator.'}, status=status.HTTP_400_BAD_REQUEST)


class ToggleProjectVisibility(generics.UpdateAPIView):
    authentication_classes = [TokenAuthentication]
    # with addCollaboratorPermission should be allowed to do this
    permission_classes = [IsAuthenticated, IsCollaborator]

    def put(self, request, *args, **kwargs):
        #check to see if the user is the owner or collaborator of the project
        try:
            obj = Project.objects.get(pk=kwargs['pk'])
        except Exception as e:
            print(e)
            return Response({'message': 'Project not found.'},
                            status=status.HTTP_400_BAD_REQUEST)
        self.check_object_permissions(request, obj)

        collab = Collaborator.objects.get(collaborator=request.user, project=obj)
        collab.showProjectOnProfile = not collab.showProjectOnProfile
        collab.save()
        return Response({'message': 'Your preference has been changed.'}, status=status.HTTP_200_OK)