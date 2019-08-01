from rest_framework import serializers
from rest_framework.fields import ListField
from django.contrib.auth import get_user_model
from .models import PUser, Project, Collaborator


class MiniUserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = PUser
        fields = ['pk', 'first_name', 'last_name', 'affiliation', 'location', 'email', 'phone', 'website', 'type', 'role']

    def get_role(self, obj):
        return obj.get_role_display()


# Used for the project cards in the browse page
class ProjectShortSerializer(serializers.ModelSerializer):
    owner = MiniUserSerializer(many=False, read_only=True)
    status = serializers.SerializerMethodField()
    ageRanges = serializers.SerializerMethodField()
    researchTopics = serializers.SerializerMethodField()
    deliveryModes = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['pk', 'type', 'name', 'owner', 'status', 'summary', 'ageRanges', 'researchTopics', 'deliveryModes', 'datePosted', 'alternateLocation', 'alternateContact', 'datePosted']

    def get_status(self, obj):
        return obj.get_status_display()

    def get_ageRanges(self, obj):
        return obj.ageRanges

    def get_researchTopics(self, obj):
        return obj.researchTopics

    def get_deliveryModes(self, obj):
        return obj.deliveryModes


class StringArrayField(ListField):
    def to_internal_value(self, data):
        return super().to_internal_value(data)


class UserUpdateSerializer(serializers.ModelSerializer):
    researchInterests = StringArrayField()
    roles = StringArrayField()
    ageRanges = StringArrayField()
    deliveryModes = StringArrayField()

    class Meta:
        model = get_user_model()
        exclude = ['groups', 'is_active', 'is_staff', 'is_superuser', 'last_login', 'password', 'user_permissions', 'username', 'type']


class ProjectUpdateSerializer(serializers.ModelSerializer):
    ageRanges = StringArrayField()
    researchTopics = StringArrayField()
    deliveryModes = StringArrayField()

    class Meta:
        model = Project
        exclude = ['owner']


class UserSerializer(serializers.ModelSerializer):
    projects = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    researchInterests = serializers.SerializerMethodField()
    roles = serializers.SerializerMethodField()
    ageRanges = serializers.SerializerMethodField()
    deliveryModes = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        exclude = ['groups', 'is_active', 'is_staff', 'is_superuser', 'last_login', 'password', 'user_permissions', 'username', 'type']

    def get_projects(self, obj):
        projects = []
        collabs = Collaborator.objects.filter(collaborator=obj.pk, showProjectOnProfile=True)

        for collab in collabs:
            projects.append(ProjectShortSerializer(Project.objects.get(pk=collab.project.pk)).data)

        owned_projects = Project.objects.filter(owner=obj.pk)

        for project in owned_projects:
            projects.append(ProjectShortSerializer(project).data)

        return projects

    def get_role(self, obj):
        return obj.get_role_display()

    def get_researchInterests(self, obj):
        return obj.researchInterests

    def get_roles(self, obj):
        return obj.roles

    def get_ageRanges(self, obj):
        return obj.ageRanges

    def get_deliveryModes(self, obj):
        return obj.deliveryModes


# Used for the user cards in the browse page
class UserShortSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    numProjects = serializers.SerializerMethodField('num_projects')
    researchInterests = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ['pk', 'type', 'first_name', 'last_name', 'role', 'affiliation', 'locatedAtCornell', 'locatedAtCCE', 'researchInterests', 'location', 'email', 'numProjects', 'date_joined']

    def get_role(self, obj):
        return obj.get_role_display()

    def num_projects(self, obj):
        projects = []
        collabs = Collaborator.objects.filter(collaborator=obj.pk, showProjectOnProfile=True)

        for collab in collabs:
            projects.append(ProjectShortSerializer(Project.objects.get(pk=collab.project.pk)).data)

        owned_projects = Project.objects.filter(owner=obj.pk)
        for project in owned_projects:
            projects.append(ProjectShortSerializer(project).data)

        return len(projects)

    def get_researchInterests(self, obj):
        return obj.researchInterests


class ProjectSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    owner = MiniUserSerializer(many=False, read_only=True)
    collaborators = serializers.SerializerMethodField()
    ageRanges = serializers.SerializerMethodField()
    researchTopics = serializers.SerializerMethodField()
    deliveryModes = serializers.SerializerMethodField()

    class Meta:
        model = Project
        exclude = ['isApproved', 'type']

    def get_collaborators(self, obj):
        collaborator_queryset = Collaborator.objects.filter(project=obj)
        collaborators = []
        for collaborator in collaborator_queryset:
            if collaborator.showProjectOnProfile:
                collaborators.append(UserShortSerializer(PUser.objects.get(email=collaborator.collaborator)).data)
        return collaborators

    def get_status(self, obj):
        return obj.get_status_display()

    def get_ageRanges(self, obj):
        return obj.ageRanges

    def get_researchTopics(self, obj):
        return obj.researchTopics

    def get_deliveryModes(self, obj):
        return obj.deliveryModes


class CollaboratorSerializer(serializers.ModelSerializer):
    pk = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()

    class Meta:
        model = Collaborator
        fields = ['pk', 'editPermission', 'deletePermission', 'editCollaboratorsPermission', 'email', 'first_name', 'last_name']

    def get_pk(self, obj):
        return PUser.objects.get(pk=obj.collaborator.pk).pk

    def get_first_name(self, obj):
        return PUser.objects.get(pk=obj.collaborator.pk).first_name

    def get_last_name(self, obj):
        return PUser.objects.get(pk=obj.collaborator.pk).last_name

    def get_email(self, obj):
        return PUser.objects.get(pk=obj.collaborator.pk).email


class CollaboratorSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = PUser
        fields = ['pk', 'first_name', 'last_name', 'email']
