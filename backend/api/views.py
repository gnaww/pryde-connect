from django.shortcuts import render



from rest_framework import generics


from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


# example of function based view
@api_view()
@permission_classes((AllowAny, ))
def hello_world(request):
    return Response({'message': 'hello world!'})
