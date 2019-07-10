from rest_framework import serializers

from django.contrib.auth import get_user_model
from .models import PUser, Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('pk', 'user', 'name_of_study', 'collaborators', 'status', 'research_topics',
                  'age_youth', 'goal', 'timeline', 'participant_involvement', 'incentives',
                  'incentives_participants', 'delivery_models', 'additional_desc', 'website')

# Used for the project cards in browse page
class ProjectShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('pk', 'type', 'name', 'owner', 'status', 'summary')

class UserSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('pk', 'first_name', 'last_name', 'email', 'projects', )

# Used for the user cards in browse page
class UserShortSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('pk', 'type', 'first_name', 'last_name', 'role', 'affiliation')
