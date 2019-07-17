from rest_framework import generics, status
from .serializers import ProjectSerializer, UserSerializer
from .models import Project, PUser
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response


class AllUserView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = PUser.objects.all()


class UserView(generics.RetrieveAPIView):
    permission_classes = [AllowAny, ]
    serializer_class = UserSerializer
    queryset = PUser.objects.all()


class LoggedInUserView(generics.RetrieveAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        user = PUser.objects.get(pk=request.user.pk)
        serializer = UserSerializer(user)
        return Response(data=serializer.data)


class UserProjectsList(generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        pk = kwargs['pk']
        user = PUser.objects.get(pk=pk)
        projects = Project.objects.filter(owner=user)
        serializer = ProjectSerializer(projects, many=True)
        return Response(data=serializer.data)


class ProjectView(generics.RetrieveAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class ProjectList(generics.ListAPIView):
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


        print("KLDJSFJSDLKJFLSDKJFLDK")
        print("KLDJSFJSDLKJFLSDKJFLDK")
        print("KLDJSFJSDLKJFLSDKJFLDK")
        print("KLDJSFJSDLKJFLSDKJFLDK")
        print("KLDJSFJSDLKJFLSDKJFLDK")
        print("KLDJSFJSDLKJFLSDKJFLDK")
        print("KLDJSFJSDLKJFLSDKJFLDK")
        print("KLDJSFJSDLKJFLSDKJFLDK")
        print("KLDJSFJSDLKJFLSDKJFLDK")
        print("KLDJSFJSDLKJFLSDKJFLDK")
        try:
            new_project = Project.objects.create(
                name=request.data['name'],
                owner=user,
                status=request.data['status'],
                summary=request.data['summary'],
                researchTopics=request.data['researchTopics'],
                ageRanges=request.data['ageRanges'],
                deliveryModes=request.data['deliveryModes'],
                timeline=request.data['timeline'],
                commitmentLength=request.data['timeline'],
                incentives=request.data['incentives'],
                collaborators=request.data['collaborators'], # TODO: this probably needs changing
                additionalInformation=request.data['additionalInformation'],
                additionalFiles=request.data['additionalFiles'], # TODO: this probably needs changing
            )
            return Response({'status': 'Project successfully created.'}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({
                'status': 'Failure... something went wrong'
            }, status=status.HTTP_400_BAD_REQUEST)
