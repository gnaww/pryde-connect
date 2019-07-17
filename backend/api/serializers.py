from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import PUser, Project

class SimpleUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = PUser
        fields = ['first_name', 'last_name', 'affiliation', 'location', 'email', 'phone', 'website',]

class ProjectSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    owner = SimpleUserSerializer(many=False, read_only=True)
    class Meta:
        model = Project
        fields = '__all__'

    def get_status(self, obj):
        return obj.get_status_display()


# Used for the project cards in the browse page

class UserSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = '__all__'


class ProjectShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('pk', 'name', 'owner', 'status', 'summary')



# Used for the user cards in the browse page
class UserShortSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('pk', 'firstName', 'lastName', 'role', 'affiliation')
