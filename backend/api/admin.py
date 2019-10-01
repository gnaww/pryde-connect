from django.contrib import admin
from .models import PUser, Project, Collaborator, ResearchInterestUser, TopicsProject, DeliveryModeProject, File, AgeRangeUser, DeliveryModeUser, AgeRangeProject, UserEmailPreference


class PUserAdmin(admin.ModelAdmin):
    def name(self, obj):
        return "%s %s" % (obj.first_name, obj.last_name)
    name.short_description = 'Name'

    search_fields = ['email', 'first_name', 'last_name', 'phone', 'role', 'displayRole', 'affiliation', 'date_joined', 'location']
    list_display = ['name', 'email', 'phone', 'role', 'displayRole', 'location', 'affiliation', 'date_joined']
    list_filter = ['role']


class ProjectAdmin(admin.ModelAdmin):
    search_fields = ['name', 'owner__first_name', 'owner__last_name', 'owner__email', 'status', 'datePosted', 'isApproved']
    list_display = ['name', 'owner', 'status', 'datePosted', 'isApproved']
    list_filter = ['status', 'isApproved']


class CollaboratorAdmin(admin.ModelAdmin):
    search_fields = ['collaborator__first_name', 'collaborator__last_name', 'collaborator__email', 'project__name', 'project__owner__first_name', 'project__owner__last_name', 'project__owner__email']
    list_display = ['collaborator', 'project', 'editPermission', 'deletePermission', 'editCollaboratorsPermission', 'showProjectOnProfile']


class ResearchInterestUserAdmin(admin.ModelAdmin):
    search_fields = ['user__first_name', 'user__last_name', 'user__email', 'researchInterest']
    list_display = ['researchInterest', 'user']
    list_filter = ['researchInterest']


class AgeRangeUserAdmin(admin.ModelAdmin):
    search_fields = ['user__first_name', 'user__last_name', 'user__email', 'ageRange']
    list_display = ['ageRange', 'user']
    list_filter = ['ageRange']


class DeliveryModeUserAdmin(admin.ModelAdmin):
    search_fields = ['user__first_name', 'user__last_name', 'user__email', 'deliveryMode']
    list_display = ['deliveryMode', 'user']
    list_filter = ['deliveryMode']


class TopicsProjectAdmin(admin.ModelAdmin):
    search_fields = ['project__name', 'project__owner__first_name', 'project__owner__last_name', 'project__owner__email', 'researchTopic']
    list_display = ['researchTopic', 'project']
    list_filter = ['researchTopic']


class DeliveryModeProjectAdmin(admin.ModelAdmin):
    search_fields = ['project__name', 'project__owner__first_name', 'project__owner__last_name', 'project__owner__email', 'deliveryMode']
    list_display = ['deliveryMode', 'project']
    list_filter = ['deliveryMode']


class AgeRangeProjectAdmin(admin.ModelAdmin):
    search_fields = ['project__name', 'project__owner__first_name', 'project__owner__last_name', 'project__owner__email', 'ageRange']
    list_display = ['ageRange', 'project']
    list_filter = ['ageRange']


class FileAdmin(admin.ModelAdmin):
    search_fields = ['file_name', 'project__name', 'project__owner__first_name', 'project__owner__last_name', 'project__owner__email']
    list_display = ['file_name', 'project']


class UserEmailPreferenceAdmin(admin.ModelAdmin):
    search_fields = ['user__first_name', 'user__last_name', 'user__email', 'type', 'preferenceName', 'preferenceValue']
    list_display = ['user', 'type', 'preferenceName', 'preferenceValue']
    list_filter = ['preferenceName', 'preferenceValue', 'type']

admin.site.register(PUser, PUserAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Collaborator, CollaboratorAdmin)
admin.site.register(ResearchInterestUser, ResearchInterestUserAdmin)
admin.site.register(AgeRangeUser, AgeRangeUserAdmin)
admin.site.register(DeliveryModeUser, DeliveryModeUserAdmin)
admin.site.register(TopicsProject, TopicsProjectAdmin)
admin.site.register(AgeRangeProject, AgeRangeProjectAdmin)
admin.site.register(DeliveryModeProject, DeliveryModeProjectAdmin)
admin.site.register(File, FileAdmin)
admin.site.register(UserEmailPreference, UserEmailPreferenceAdmin)
admin.site.site_header = "PRYDE Connect Admin Dashboard";
admin.site.site_title = "PRYDE Connect";
