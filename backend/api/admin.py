from django.contrib import admin
from .models import PUser, Project


# Register your models here.
class PUserAdmin(admin.ModelAdmin):
    search_fields = ['email']


admin.site.register(PUser, PUserAdmin)
admin.site.register(Project)


