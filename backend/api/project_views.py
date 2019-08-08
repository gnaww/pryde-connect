from rest_framework import generics, status
from .serializers import ProjectSerializer, ProjectShortSerializer, FileSerializer
from .models import Project, PUser, TopicsProject, DeliveryModeProject, File
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

# custom permissions
from .permissions import CanDeleteProject, CanEditProject
import os


class ProjectList(generics.ListAPIView):
    serializer_class = ProjectShortSerializer
    queryset = Project.objects.filter(isApproved=True)


class ProjectView(generics.RetrieveAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.filter(isApproved=True)

    def get(self, request, *args, **kwargs):
        try:
            project = Project.objects.get(pk=kwargs['pk'])
            return Response(data=ProjectSerializer(project, context={"request": request}).data)
        except Exception as e:
            print(e)
            return Response({ 'message': 'Project not found.' }, status=status.HTTP_404_NOT_FOUND)


class CreateProject(generics.CreateAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    queryset = Project.objects.filter(isApproved=True)

    def post(self, request, *args, **kwargs):
        user = PUser.objects.get(pk=request.user.pk)
        try:
            new_project = Project.objects.create(
                name=request.data['name'],
                owner=user,
                status=request.data['status'],
                summary=request.data['summary'],
                ageRanges=request.data['ageRanges'],
                timeline=request.data['timeline'],
                commitmentLength=request.data['timeline'],
                incentives=request.data['incentives'],
                additionalInformation=request.data['additionalInformation'],
                alternateContact=request.data['alternateContact'],
                alternateLocation=request.data['alternateLocation']
            )

            for mode in request.data['deliveryModes']:
                try:
                    DeliveryModeProject.objects.create(project=new_project, deliveryMode=mode)
                except Exception as e:
                    print(e)
                    return Response({
                'status': 'Something went wrong while creating the project.'
            }, status=status.HTTP_400_BAD_REQUEST)

            for topic in request.data['researchTopics']:
                try:
                    TopicsProject.objects.create(project=new_project, researchTopic=topic)
                except Exception as e:
                    print(e)
                    return Response({
                'status': 'Something went wrong while creating the project.'
            }, status=status.HTTP_400_BAD_REQUEST)

            return Response({'data': ProjectSerializer(new_project).data}, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(e)
            return Response({
                'status': 'Something went wrong while creating the project.'
            }, status=status.HTTP_400_BAD_REQUEST)


class UpdateProject(generics.UpdateAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [CanEditProject & IsAuthenticated, ]

    def put(self, request, *args, **kwargs):
        try:
            project = Project.objects.get(pk=kwargs['pk'])
            self.check_object_permissions(request, project)

            project.name = request.data['name']
            project.status = request.data['status']
            project.summary = request.data['summary']
            project.ageRanges = request.data['ageRanges']
            project.timeline = request.data['timeline']
            project.commitmentLength = request.data['commitmentLength']
            project.incentives = request.data['incentives']
            project.additionalInformation = request.data['additionalInformation']
            project.alternateContact = request.data['alternateContact']
            project.alternateLocation = request.data['alternateLocation']
            project.save()

            TopicsProject.objects.filter(project=project.pk).delete()
            for new_topic in request.data['researchTopics']:
                TopicsProject.objects.create(project=project, researchTopic=new_topic)
            DeliveryModeProject.objects.filter(project=project.pk).delete()
            for new_mode in request.data['deliveryModes']:
                DeliveryModeProject.objects.create(project=project, deliveryMode=new_mode)

            return Response(data=ProjectShortSerializer(project).data, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({'message': 'Something went wrong while updating the project information.'}, status=status.HTTP_400_BAD_REQUEST)


class DeleteProject(generics.DestroyAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [CanDeleteProject & IsAuthenticated, ]
    queryset = Project.objects.filter(isApproved=True)


class UploadFile(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [CanEditProject & IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        try:
            if Project.objects.filter(pk=kwargs['pk']).exists():
                project = Project.objects.get(pk=kwargs['pk'])
                self.check_object_permissions(request, project)

                if File.objects.filter(project=project.pk).count() >= 5:
                    return Response({'message': 'Not allowed to upload more than 5 additional files.'})

                request.data['project'] = project.pk
                request.data['file_name'] = str(request.data['file'])
                file_serializer = FileSerializer(data=request.data)

                if file_serializer.is_valid():
                    file_serializer.save()
                    return Response(file_serializer.data, status=status.HTTP_201_CREATED)

                else:
                    return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'message': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            print(e)
            return Response({'message': 'Something went wrong while uploading the file.'},
                            status=status.HTTP_400_BAD_REQUEST)


class DeleteFile(generics.DestroyAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [CanEditProject & IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def delete(self, request, *args, **kwargs):
        try:
            if Project.objects.filter(pk=kwargs['pk']).exists():
                project = Project.objects.get(pk=kwargs['pk'])
                self.check_object_permissions(request, project)

                if File.objects.filter(pk=kwargs['filepk']).exists():
                    file = File.objects.get(pk=kwargs['filepk'])
                    os.remove(file.file.path)
                    file.delete()

                    return Response({ 'message': 'File successfully deleted.' }, status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response({ 'message': 'File not found.' }, status=status.HTTP_404_NOT_FOUND)

            else:
                return Response({ 'message': 'Project not found.' }, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            print(e)
            return Response({ 'message': 'Something went wrong while deleting the file.' }, status=status.HTTP_400_BAD_REQUEST)
