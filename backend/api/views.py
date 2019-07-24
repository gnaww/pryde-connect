from rest_framework import generics, status
from .serializers import ProjectSerializer, ProjectShortSerializer, UserSerializer, UserShortSerializer
from .models import Project, PUser, Collaborators
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

# custom permissions
from .permissions import CanAddCollaborator, CanDeleteProject, CanEditDeleteUser


class UserList(generics.ListAPIView):
    serializer_class = UserShortSerializer
    queryset = PUser.objects.filter(is_staff=False)


class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = PUser.objects.filter(is_staff=False)


class UserProjectsList(generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        pk = kwargs['pk']
        user = PUser.objects.get(pk=pk)
        projects = Project.objects.filter(owner=user)
        serializer = ProjectSerializer(projects, many=True)
        return Response(data=serializer.data)


class LoggedInUserView(generics.RetrieveAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        user = PUser.objects.get(pk=request.user.pk)
        serializer = UserSerializer(user)
        return Response(data=serializer.data)


class DeleteUser(generics.DestroyAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [CanEditDeleteUser & IsAuthenticated, ]
    queryset = PUser.objects.all()


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


class DeleteProject(generics.DestroyAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [CanDeleteProject & IsAuthenticated, ]
    queryset = Project.objects.all()


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
            return Response({'message': 'Project not found'},
                            status=status.HTTP_400_BAD_REQUEST)


        # check to see if they have proper permission to perform this request
        # this will throw an error if they do not have permissions
        self.check_object_permissions(request, obj)

        try:
            # the owner of the project should not be able to add themselves as a collaborator
            if obj.owner == PUser.objects.get(pk=request.data['user']):
                return Response({'message': 'You cannot add yourself as a collaborator'}, status=status.HTTP_400_BAD_REQUEST)

            # user shouldn't be able to add themselves as a collaborator to a project that they own

            # check to see if the user is already added as a collaborator to this project
            if Collaborators.objects.filter(project=Project.objects.get(pk=kwargs['pk']),
                                         collaborator=PUser.objects.get(pk=request.data['user'])).exists():
                return Response({'message': 'This user is already a collaborator'}, status=status.HTTP_400_BAD_REQUEST)

            Collaborators.objects.create(project=Project.objects.get(pk=kwargs['pk']),
                                         collaborator=PUser.objects.get(pk=request.data['user']),
                                         editPermission=request.data['editPermission'],
                                         deletePermission=request.data['deletePermission'],
                                         addCollaboratorPermission=request.data['addCollaboratorPermission'])

            return Response({'message': 'Collaborator successfully added.'}, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({'message': 'Something went wrong while adding a collaborator.'},status=status.HTTP_400_BAD_REQUEST)


class FilterProjects(generics.ListAPIView):

    def get(self, request, *args, **kwargs):

        print(request.GET)
        filtered_set = Project.objects.none()

        # deal with status query
        if 'status' in request.GET:
            status_dict = {
                'Completed': 1,
                'In Progress': 2,
                'Not Started': 3
            }
            status_params = request.GET['status'].split(',')

            print(status_params)
            for param in status_params:
                filtered_set = filtered_set | Project.objects.filter(status=status_dict[param])

        if 'researchtopic' in request.GET:
            filtered_researchtopic_set = Project.objects.none()
            research_topics = request.GET['researchtopic'].split(',')
            for topic in research_topics:
                filtered_researchtopic_set = filtered_researchtopic_set |\
                                             Project.objects.filter(researchTopics__contains=[topic])

            filtered_set = filtered_set & filtered_researchtopic_set

            serializer = ProjectShortSerializer(filtered_set, many=True)
            return Response(data=serializer.data)
