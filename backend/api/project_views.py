from rest_framework import generics, status
from .serializers import ProjectSerializer, ProjectShortSerializer, ProjectUpdateSerializer
from .models import Project, PUser, TopicsProject, DeliveryModeProject
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

# custom permissions
from .permissions import CanDeleteProject, CanEditProject


class ProjectList(generics.ListAPIView):
    serializer_class = ProjectShortSerializer
    queryset = Project.objects.filter(isApproved=True)


class ProjectView(generics.RetrieveAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.filter(isApproved=True)


class CreateProject(generics.CreateAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    queryset = Project.objects.filter(isApproved=True)

    #TODO: THE PLACEMENT OF THE TRY BLOCKS MIGHT BE MESSED UP

    def post(self, request, *args, **kwargs):
        user = PUser.objects.get(pk=request.user.pk)
        try:
            new_project = Project.objects.create(
                name=request.data['name'],
                owner=user,
                status=request.data['status'],
                summary=request.data['summary'],
                # researchTopics=request.data['researchTopics'],
                ageRanges=request.data['ageRanges'],
                # deliveryModes=request.data['deliveryModes'],
                timeline=request.data['timeline'],
                commitmentLength=request.data['timeline'],
                incentives=request.data['incentives'],
                additionalInformation=request.data['additionalInformation'],
                # additionalFiles = request.data['additionalFiles'], # TODO: this probably needs changing
                alternateContact=request.data['alternateContact'],
                alternateLocation=request.data['alternateLocation']
            )

            for mode in request.data['deliveryModes']:
                try:
                    DeliveryModeProject.objects.create(project=new_project, deliveryMode=mode)
                except Exception as e:
                    print(e)

            for topic in request.data['researchTopics']:
                try:
                    TopicsProject.objects.create(project=new_project, researchTopic=topic)
                except Exception as e:
                    print(e)

            return Response({'data': ProjectSerializer(new_project).data}, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(e)
            return Response({
                'status': 'Something went wrong while creating the project.'
            }, status=status.HTTP_400_BAD_REQUEST)


class UpdateProject(generics.UpdateAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [CanEditProject & IsAuthenticated, ]
    serializer_class = ProjectUpdateSerializer
    queryset = Project.objects.filter(isApproved=True)


class DeleteProject(generics.DestroyAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [CanDeleteProject & IsAuthenticated, ]
    queryset = Project.objects.filter(isApproved=True)