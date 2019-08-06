from allauth.account.adapter import DefaultAccountAdapter
from ..models import ResearchInterestUser
from rest_framework.response import Response
from rest_framework import status
import os
import requests

class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=False):
        try:
            data = {
                'secret': os.getenv("RECAPTCHA_SECRET_DEV_KEY"), # TODO: use production key
                'response': request.data['RECAPTCHAToken']
            }
            r = requests.post(url="https://www.google.com/recaptcha/api/siteverify", data=data)
            responseJSON = r.json()

        except Exception as e:
            # TODO: how to cancel registration / return a response when request is invalid?
            print(e)
            return Response({'message': 'Something went wrong while while verifying the RECAPTCHA challenge.'}, status=status.HTTP_400_BAD_REQUEST)

        print(responseJSON)
        if (responseJSON['success']):
            print('hi')
            user = super().save_user(request, user, form, commit)
            data = form.cleaned_data
            user.first_name = data.get('first_name')
            user.last_name = data.get('last_name')
            user.role = data.get('role')
            user.displayRole = data.get('displayRole')
            user.affiliation = data.get('affiliation')
            user.location = data.get('location')
            user.phone = data.get('phone')
            user.website = data.get('website')
            user.researchDescription = data.get('researchDescription')
            user.roles = data.get('roles')
            user.ageRanges = data.get('ageRanges')
            user.deliveryModes = data.get('deliveryModes')
            user.researchNeeds = data.get('researchNeeds')
            user.evaluationNeeds = data.get('evaluationNeeds')
            user.locatedAtCornell = data.get('locatedAtCornell')
            user.locatedAtCCE = data.get('locatedAtCCE')

            user.save()

            for interest in data.get('researchInterests'):
                ResearchInterestUser.objects.create(user=user, researchInterest=interest)

            return user
        else:
            print('b')
            # TODO: how to cancel registration / return a response when request is invalid?
            return Response({'message': 'You have not been registered as a new user because RECAPTCHA detected that you are a robot.'}, status=status.HTTP_400_BAD_REQUEST)
