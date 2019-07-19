from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer

class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    role = serializers.IntegerField(max_value=2)
    displayRole = serializers.IntegerField(max_value=7)
    affiliation = serializers.CharField(max_length=100)
    location = serializers.CharField(max_length=100)
    phone = serializers.RegexField("[0-9]{10}")
    website = serializers.URLField()
    researchDescription = serializers.CharField(max_length=100)
    researchInterests = serializers.ListField(child=serializers.CharField(max_length=100))
    roles = serializers.ListField(child=serializers.CharField(max_length=100))
    ageRanges = serializers.ListField(child=serializers.CharField(max_length=100))
    youthProgramTypes = serializers.ListField(child=serializers.CharField(max_length=100))
    deliveryModes = serializers.ListField(child=serializers.CharField(max_length=100))
    researchNeeds = serializers.ListField(child=serializers.CharField(max_length=100))
    evaluationNeeds = serializers.ListField(child=serializers.CharField(max_length=100))

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()

        data_dict['first_name'] = self.validated_data.get('first_name', '')
        data_dict['last_name'] = self.validated_data.get('last_name', '')
        data_dict['role'] = self.validated_data.get('role', '')
        data_dict['displayRole'] = self.validated_data.get('displayRole', '')
        data_dict['affiliation'] = self.validated_data.get('affiliation', '')
        data_dict['location'] = self.validated_data.get('location', '')
        data_dict['phone'] = self.validated_data.get('phone', '')
        data_dict['website'] = self.validated_data.get('website', '')
        data_dict['researchDescription'] = self.validated_data.get('researchDescription', '')
        data_dict['researchInterests'] = self.validated_data.get('researchInterests', '')
        data_dict['roles'] = self.validated_data.get('roles', '')
        data_dict['ageRanges'] = self.validated_data.get('ageRanges', '')
        data_dict['youthProgramTypes'] = self.validated_data.get('youthProgramTypes', '')
        data_dict['deliveryModes'] = self.validated_data.get('deliveryModes', '')
        data_dict['researchNeeds'] = self.validated_data.get('researchNeeds', '')
        data_dict['evaluationNeeds'] = self.validated_data.get('evaluationNeeds', '')

        return data_dict
