from rest_framework import generics, status
from .serializers import ProjectSerializer, ProjectShortSerializer, UserSerializer,\
    UserShortSerializer, UserUpdateSerializer, ProjectUpdateSerializer
from .models import Project, PUser, Collaborator
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

# custom permissions
from .permissions import CanAddCollaborator, CanDeleteProject, CanEditDeleteUser, CanEditProject, IsCollaborator

class ProjectList(generics.ListAPIView):
    serializer_class = ProjectShortSerializer
    queryset = Project.objects.all()


class ProjectView(generics.RetrieveAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class CreateProject(generics.CreateAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def post(self, request, *args, **kwargs):
        user = PUser.objects.get(pk=request.user.pk)
        print(request.data)
        try:
            new_project = Project.objects.create(
                name = request.data['name'],
                owner = user,
                status = request.data['status'],
                summary = request.data['summary'],
                researchTopics = request.data['researchTopics'],
                ageRanges = request.data['ageRanges'],
                deliveryModes = request.data['deliveryModes'],
                timeline = request.data['timeline'],
                commitmentLength = request.data['timeline'],
                incentives = request.data['incentives'],
                additionalInformation = request.data['additionalInformation'],
                # additionalFiles = request.data['additionalFiles'], # TODO: this probably needs changing
                alternateContact = request.data['alternateContact'],
                alternateLocation = request.data['alternateLocation']
            )

            #TODO create the collaborator thing here
            return Response({'status': 'Project successfully created.'}, status = status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({
                'status': 'Something went wrong while creating the project.'
            }, status=status.HTTP_400_BAD_REQUEST)


class UpdateProject(generics.UpdateAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [CanEditProject & IsAuthenticated, ]
    serializer_class = ProjectUpdateSerializer
    queryset = Project.objects.all()


class DeleteProject(generics.DestroyAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [CanDeleteProject & IsAuthenticated, ]
    queryset = Project.objects.all()