from rest_framework import generics, status
from .serializers import UserSerializer, LoggedInUserSerializer, UserShortSerializer, ProfilePictureSerializer
from .models import Project, PUser, ResearchInterestUser, ProfilePicture
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .permissions import CanEditDeleteUser
from rest_framework.parsers import MultiPartParser, FormParser


class UserList(generics.ListAPIView):
    serializer_class = UserShortSerializer
    queryset = PUser.objects.filter(is_staff=False)


class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = PUser.objects.filter(is_staff=False)


class LoggedInUserView(generics.RetrieveAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        user = PUser.objects.get(pk=request.user.pk)
        serializer = LoggedInUserSerializer(user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UpdateUser(generics.UpdateAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [CanEditDeleteUser & IsAuthenticated, ]

    def put(self, request, *args, **kwargs):
        try:
            user = PUser.objects.get(pk=request.user.pk)
            self.check_object_permissions(request, user)

            user.locatedAtCornell = request.data['locatedAtCornell']
            user.locatedAtCCE = request.data['locatedAtCCE']
            user.role = request.data['role']
            user.displayRole = request.data['displayRole']
            user.affiliation = request.data['affiliation']
            user.location = request.data['location']
            user.email = request.data['email']
            user.phone = request.data['phone']
            user.website = request.data['website']
            user.researchDescription = request.data['researchDescription']
            user.roles = request.data['roles']
            user.ageRanges = request.data['ageRanges']
            user.deliveryModes = request.data['deliveryModes']
            user.researchNeeds = request.data['researchNeeds']
            user.evaluationNeeds = request.data['evaluationNeeds']
            user.save()

            ResearchInterestUser.objects.filter(user=user.pk).delete()
            for new_interest in request.data['researchInterests']:
                ResearchInterestUser.objects.create(user=user, researchInterest=new_interest)

            return Response(data=UserShortSerializer(user).data, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({'message': 'Something went wrong while updating your profile.'}, status=status.HTTP_400_BAD_REQUEST)


class DeleteUser(generics.DestroyAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [CanEditDeleteUser & IsAuthenticated, ]
    queryset = PUser.objects.filter(is_staff=False)


class ProfilePictureView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def post(self, request, *args, **kwargs):
        #TODO: NEED TO FIGURE OUT HOW TO DELETE THE PICTURES FROM SERVER WHEN THEY ADD A NEW ONE
        print(request.data)
        print(request.user)
        print(request.user.pk)
        file_serializer = ProfilePictureSerializer(data={'user':request.user.pk, 'file':request.data['file']})
        if file_serializer.is_valid():
            # THIS ONLY DELETES THE INSTANCE IN DATABASE, NOT THE ACTUAL FILE
            ProfilePicture.objects.filter(user=request.user.pk).delete()
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteProfilePicture(generics.DestroyAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def delete(self, request, *args, **kwargs):

        try:
            ProfilePicture.objects.get(user=request.user.pk).delete()
            return Response({'message': 'profile picture removed'}, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({'message': 'failure... something went wrong'})
