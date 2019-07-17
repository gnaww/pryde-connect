from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import PUser, Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

# Used for the project cards in the browse page
class ProjectShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['pk', 'name', 'owner', 'status', 'summary']

class UserSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        exclude = ['date_joined', 'groups', 'is_active', 'is_staff', 'is_superuser', 'last_login', 'password', 'user_permissions']

# Used for the user cards in the browse page
class UserShortSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ['pk', 'first_name', 'last_name', 'role', 'affiliation']
