from django.shortcuts import render

from rest_framework import generics, status
from .serializers import ProjectSerializer, UserSerializer
from .models import Project, PUser


from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = PUser.objects.all()


class ProjectView(generics.RetrieveAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class ProjectList(generics.ListAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class SingleUser(generics.RetrieveAPIView):

    def get(self, request, *args, **kwargs):
        pk = kwargs['pk']
        user = PUser.objects.get(pk=pk)
        serializer = UserSerializer(user)
        return Response(data=serializer.data)


class ProjectViewOne(generics.RetrieveAPIView):

    def get(self, request, *args, **kwargs):

        pk = kwargs['pk']

        user = PUser.objects.get(pk=pk)

        projects = Project.objects.filter(user=user)

        serializer = ProjectSerializer(projects, many=True)

        return Response(data=serializer.data)


class ProjectCreate(generics.CreateAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def post(self, request, *args, **kwargs):
        print(request.data)
        print(request.user.pk)
        user = PUser.objects.filter(pk=request.user.pk).first()

        try:
            study_created = Project.objects.create(user=user, name_of_study=request.data['name_of_study'],
                                                 collaborators=request.data['collaborators'],
                                                 status=request.data['status'],
                                                 research_topics=request.data['research_topics'],
                                                 age_youth=request.data['age_youth'],
                                                 goal=request.data['goal'],
                                                 timeline=request.data['timeline'],
                                                 participant_involvement=request.data['participant_involvement'],
                                                 incentives=request.data['incentives'],
                                                 incentives_participants=request.data['incentives_participants'],
                                                 delivery_models=request.data['delivery_models'],
                                                 additional_desc=request.data['additional_desc'],
                                                 website=request.data['website'])
            return Response({'status': 'Success, study created.'}, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({
                'status': 'Failure... something went wrong'
            }, status=status.HTTP_400_BAD_REQUEST)


# example of function based view
@api_view()
@permission_classes((AllowAny, ))
def hello_world(request):
    return Response({'message': 'hello world!'})
