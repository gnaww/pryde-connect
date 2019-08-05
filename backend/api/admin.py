from django.contrib import admin
from .models import PUser, Project, Collaborator, ResearchInterestUser, TopicsProject, DeliveryModeProject, File


# Register your models here.
class PUserAdmin(admin.ModelAdmin):
    search_fields = ['email']

admin.site.register(PUser, PUserAdmin)
admin.site.register(Project)
admin.site.register(Collaborator)
admin.site.register(ResearchInterestUser)
admin.site.register(TopicsProject)
admin.site.register(DeliveryModeProject)
admin.site.register(File)
admin.site.site_header = "PRYDE Connect Admin Dashboard";
admin.site.site_title = "PRYDE Connect";
