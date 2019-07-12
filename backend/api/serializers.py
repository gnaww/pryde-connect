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
        fields = ('pk', 'name', 'owner', 'status', 'summary')

class UserSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = '__all__'

# Used for the user cards in the browse page
class UserShortSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('pk', 'firstName', 'lastName', 'role', 'affiliation')
