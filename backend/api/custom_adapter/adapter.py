from allauth.account.adapter import DefaultAccountAdapter

# TODO: update this to match the new PUser model?
class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data
        user.first_name = data.get('first_name')
        user.last_name = data.get('last_name')
        # user.type = data.get('type')
        user.save()
        return user
