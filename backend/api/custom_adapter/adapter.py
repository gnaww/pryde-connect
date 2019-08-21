from allauth.account.adapter import DefaultAccountAdapter
from ..models import ResearchInterestUser, AgeRangeUser, DeliveryModeUser
from rest_framework.response import Response
from rest_framework import status
import os
import requests

class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=False):

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
        user.researchNeeds = data.get('researchNeeds')
        user.evaluationNeeds = data.get('evaluationNeeds')
        user.locatedAtCornell = data.get('locatedAtCornell')
        user.locatedAtCCE = data.get('locatedAtCCE')
        user.profile_picture = data.get('profile_picture')

        user.save()

        for interest in data.get('researchInterests'):
            ResearchInterestUser.objects.create(user=user, researchInterest=interest)

        for age in data.get('ageRanges'):
            AgeRangeUser.objects.create(user=user, ageRange=age)

        for mode in data.get('deliveryModes'):
            DeliveryModeUser.objects.create(user=user, deliveryMode=mode)

        return user
