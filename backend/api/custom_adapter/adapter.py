from allauth.account.adapter import DefaultAccountAdapter

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
        user.researchInterests = data.get('researchInterests')
        user.roles = data.get('roles')
        user.ageRanges = data.get('ageRanges')
        user.deliveryModes = data.get('deliveryModes')
        user.researchNeeds = data.get('researchNeeds')
        user.evaluationNeeds = data.get('evaluationNeeds')
        user.locatedAtCornell = data.get('locatedAtCornell')
        user.locatedAtCCE = data.get('locatedAtCCE')
        user.save()
        return user
