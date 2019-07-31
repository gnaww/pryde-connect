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


class FilterProjects(generics.ListAPIView):

    def post(self, request, *args, **kwargs):

        if ('category' not in request.data) or (request.data['category'] == 'projects'):

            filtered_set = Project.objects.all()

            if 'q' in request.data:

                search_filtered_set = Project.objects.filter(owner__first_name__icontains=request.data['q']) \
                                | Project.objects.filter(owner__last_name__icontains=request.data['q']) \
                                | Project.objects.filter(name__icontains=request.data['q']) \
                                | Project.objects.filter(summary__icontains=request.data['q']) \
                                | Project.objects.filter(researchTopics__icontains=request.data['q'])

                filtered_set = filtered_set & search_filtered_set

            if 'status' in request.data:
                filter_status_set = Project.objects.none()
                status_dict = {
                    'Completed': 1,
                    'In Progress': 2,
                    'Not Started': 3
                }

                status_params = request.data['status']
                if type(status_params) == str:
                    status_params = [status_params]

                for param in status_params:

                    filter_status_set = filter_status_set | Project.objects.filter(status=status_dict[param])

                filtered_set = filtered_set & filter_status_set

            if 'researchtopic' in request.data:
                filtered_researchtopic_set = Project.objects.none()
                research_topics = request.data['researchtopic']
                if type(research_topics) == str:
                    research_topics = [research_topics]

                for topic in research_topics:
                    filtered_researchtopic_set = filtered_researchtopic_set |\
                                                 Project.objects.filter(researchTopics__contains=topic)

                filtered_set = filtered_set & filtered_researchtopic_set

            if 'deliverymodes' in request.data:
                filtered_deliverymodes_set = Project.objects.none()

                delivery_modes = request.data['deliverymodes']
                if type(delivery_modes) == str:
                    delivery_modes = [delivery_modes]

                for mode in delivery_modes:
                    filtered_deliverymodes_set = filtered_deliverymodes_set |\
                                                 Project.objects.filter(deliveryModes__contains=mode)

                filtered_set = filtered_set & filtered_deliverymodes_set

            if 'ageranges' in request.data:
                filtered_ageranges_set = Project.objects.none()
                ageranges = request.data['ageranges']
                if type(ageranges) == str:
                    ageranges = [ageranges]
                for age in ageranges:
                    filtered_ageranges_set = filtered_ageranges_set | \
                                             Project.objects.filter(ageRanges__contains=age)

                filtered_set = filtered_set & filtered_ageranges_set

            serializer = ProjectShortSerializer(filtered_set, many=True)
            return Response(data=serializer.data)

        else:

            filtered_set = PUser.objects.filter(is_staff=False)

            if 'q' in request.data:
                search_filtered_set = PUser.objects.filter(first_name__icontains=request.data['q']) \
                                      | PUser.objects.filter(last_name__icontains=request.data['q']) \
                                      | PUser.objects.filter(researchInterests__icontains=request.data['q']) \
                                      | PUser.objects.filter(researchDescription__icontains=request.data['q']) \
                                      | PUser.objects.filter(researchNeeds__icontains=request.data['q']) \
                                      | PUser.objects.filter(location__icontains=request.data['q'])

                filtered_set = filtered_set & search_filtered_set

            if 'researchinterest' in request.data:
                filtered_researchinterest_set = PUser.objects.none()
                research_interests = request.data['researchinterest']
                if type(research_interests) == str:
                    research_interests = [research_interests]
                for n in research_interests:
                    filtered_researchinterest_set = filtered_researchinterest_set | \
                                                 PUser.objects.filter(researchInterests__contains=n)

                filtered_set = filtered_set & filtered_researchinterest_set

            if 'location' in request.data:
                filtered_location_set = PUser.objects.none()
                locations = request.data['location']
                if type(locations) == str:
                    locations = [locations]
                for location in locations:
                    filtered_location_set = filtered_location_set | \
                                            PUser.objects.filter(location=location)

                filtered_set = filtered_set & filtered_location_set

            if 'ageranges' in request.data:
                filtered_ageRanges_set = PUser.objects.non()
                ageRanges = request.data['ageranges']
                if type(ageRanges) == str:
                    ageRanges = [ageRanges]
                for agerange in ageRanges:
                    filtered_ageRanges_set = filtered_ageRanges_set | \
                                                PUser.objects.filter(ageRanges__contains=[agerange])

                filtered_set = filtered_set & filtered_ageRanges_set

            serializer = UserShortSerializer(filtered_set, many=True)
            return Response(data=serializer.data)