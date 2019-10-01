from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer

# Used for overriding built in user model
class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    role = serializers.IntegerField(max_value=2)
    displayRole = serializers.CharField(max_length=50)
    affiliation = serializers.CharField(max_length=200)
    location = serializers.CharField(max_length=200)
    phone = serializers.RegexField("[0-9]{10}", allow_blank=True)
    website = serializers.URLField(allow_blank=True)
    researchDescription = serializers.CharField(allow_blank=True)
    researchInterests = serializers.ListField(child=serializers.CharField(max_length=100))
    roles = serializers.ListField(child=serializers.CharField(max_length=100))
    ageRanges = serializers.ListField(child=serializers.CharField(max_length=100))
    deliveryModes = serializers.ListField(child=serializers.CharField(max_length=100))
    researchNeeds = serializers.CharField(allow_blank=True)
    evaluationNeeds = serializers.CharField(allow_blank=True)
    locatedAtCornell = serializers.BooleanField()
    locatedAtCCE = serializers.BooleanField()
    profile_picture = serializers.ImageField(allow_empty_file=True, required=False)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['profile_picture'] = self.validated_data.get('profile_picture', '')
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
        data_dict['deliveryModes'] = self.validated_data.get('deliveryModes', '')
        data_dict['researchNeeds'] = self.validated_data.get('researchNeeds', '')
        data_dict['evaluationNeeds'] = self.validated_data.get('evaluationNeeds', '')
        data_dict['locatedAtCCE'] = self.validated_data.get('locatedAtCCE', '')
        data_dict['locatedAtCornell'] = self.validated_data.get('locatedAtCornell', '')

        return data_dict
