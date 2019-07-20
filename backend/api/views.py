from rest_framework import generics, status
from .serializers import ProjectSerializer, ProjectShortSerializer, UserSerializer, UserShortSerializer
from .models import Project, PUser, Collaborators
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response


# custom permissions
from .permissions import CanAddCollaborator, CanDeleteProject


class UserList(generics.ListAPIView):
    serializer_class = UserShortSerializer
    queryset = PUser.objects.filter(is_staff=False)


class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = PUser.objects.all()


class LoggedInUserView(generics.RetrieveAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        user = PUser.objects.get(pk=request.user.pk)
        serializer = UserSerializer(user)
        return Response(data=serializer.data)


class ProjectView(generics.RetrieveAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class UserProjectsList(generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        pk = kwargs['pk']
        user = PUser.objects.get(pk=pk)
        projects = Project.objects.filter(owner=user)
        serializer = ProjectSerializer(projects, many=True)
        return Response(data=serializer.data)


class ProjectList(generics.ListAPIView):
    serializer_class = ProjectShortSerializer
    queryset = Project.objects.all()


class CreateProject(generics.CreateAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def post(self, request, *args, **kwargs):
        print(request.data)
        print(request.user.pk)
        user = PUser.objects.get(pk=request.user.pk)
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
                additionalFiles = request.data['additionalFiles'], # TODO: this probably needs changing
            )

            #TODO create the collaborator thing here
            return Response({'status': 'Project successfully created.'}, status = status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({
                'status': 'Something went wrong while creating the project.'
            }, status = status.HTTP_400_BAD_REQUEST)


class AddCollaborator(generics.CreateAPIView):


    authentication_classes = []
    # TODO create custom permission class: owner of project or a collaborator
    # with addCollaboratorPermission should be allowed to do this
    permission_classes = []

    def post(self, request, *args, **kwargs):

        print(request.data)
        print(request.data['user'])
        print(request.data['editPermission'])
        print(request.data['deletePermission'])
        print(request.data['addCollaboratorPermission'])
        print(args)
        print(kwargs)


        try:
            Collaborators.objects.create(project=Project.objects.get(pk=kwargs['pk']),
                                         collaborator=PUser.objects.get(pk=request.data['user']),
                                         editPermission=request.data['editPermission'],
                                         deletePermission=request.data['deletePermission'],
                                         addCollaboratorPermission=request.data['addCollaboratorPermission'])

            return Response({'message': 'Collaborator successfully added.'}, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({'message': 'Something went wrong while adding a collaborator.'},status=status.HTTP_400_BAD_REQUEST)


class DeleteProject(generics.DestroyAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [CanDeleteProject & IsAuthenticated, ]
    queryset = Project.objects.all()
