from rest_framework import serializers

from django.contrib.auth import get_user_model
from .models import PUser, Study


class StudyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Study
        fields = ('pk', 'user', 'name_of_study', 'collaborators', 'status', 'research_topics',
                  'age_youth', 'goal', 'timeline', 'participant_involvement', 'incentives',
                  'incentives_participants', 'delivery_models', 'additional_desc', 'website')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('first_name', 'last_name', 'email', 'type',)
