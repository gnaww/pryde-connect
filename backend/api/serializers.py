from rest_framework import serializers

from django.contrib.auth import get_user_model
from .models import PUser, Study


class StudySerializer(serializers.ModelSerializer):
    class Meta:
        model = Study
        fields = ('title', 'description', 'user', )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('first_name', 'last_name', 'email', 'type',)
