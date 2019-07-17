from allauth.account.adapter import DefaultAccountAdapter

# TODO: update this to match the new PUser model!
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
        user.phonenumber = data.get('phonenumber')
        user.website = data.get('website')
        user.researchDescription = data.get('researchDescription')
        user.researchInterests = data.get('researchInterests')
        user.roles = data.get('roles')
        user.ageRanges = data.get('ageRanges')
        user.youthProgramTypes = data.get('youthProgramTypes')
        user.deliveryModes = data.get('deliveryModes')
        user.researchNeeds = data.get('researchNeeds')
        user.evaluationNeeds = data.get('evaluationNeeds')
        # user.researchInterests = data.get('researchInterests')
        # user.type = data.get('type')
        user.save()
        return user
