from rest_framework import serializers

from rest_auth.registration.serializers import RegisterSerializer


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    type = serializers.CharField(max_length=10)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['first_name'] = self.validated_data.get('first_name', '')
        data_dict['last_name'] = self.validated_data.get('last_name', '')
        data_dict['type'] = self.validated_data.get('type', '')
        data_dict['phone_number'] = self.validated_data.get('phone_number', '')
        return data_dict
