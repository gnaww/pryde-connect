from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import PUser, Project, Collaborator
import ast


class MiniUserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = PUser
        fields = ['pk', 'first_name', 'last_name', 'affiliation', 'location', 'email', 'phone', 'website', 'type', 'role']

    def get_role(self, obj):
        return obj.get_role_display()


class CollaboratorSerializer(serializers.ModelSerializer):
    collaboratorInfo = serializers.SerializerMethodField()

    class Meta:
        model = Collaborator
        fields = ['collaboratorInfo']

    def get_collaboratorInfo(self, obj):
        return MiniUserSerializer(PUser.objects.get(email=obj.collaborator)).data


# Used for the project cards in the browse page
class ProjectShortSerializer(serializers.ModelSerializer):
    owner = MiniUserSerializer(many=False, read_only=True)
    status = serializers.SerializerMethodField()
    ageRanges = ast.literal_eval(ageRanges)
    researchTopics = ast.literal_eval(researchTopics)
    deliveryModes = ast.literal_eval(deliveryModes)

    class Meta:
        model = Project
        fields = ['pk', 'type', 'name', 'owner', 'status', 'summary', 'ageRanges', 'researchTopics', 'deliveryModes', 'datePosted', 'alternateLocation', 'alternateContact', 'datePosted']

    def get_status(self, obj):
        return obj.get_status_display()


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        exclude = ['groups', 'is_active', 'is_staff', 'is_superuser', 'last_login', 'password', 'user_permissions', 'username', 'type']


class ProjectUpdateSerializer(serializers.ModelSerializer):
    ageRanges = ast.literal_eval(ageRanges)
    researchTopics = ast.literal_eval(researchTopics)
    deliveryModes = ast.literal_eval(deliveryModes)

    class Meta:
        model = Project
        exclude = ['owner']

class UserSerializer(serializers.ModelSerializer):
    projects = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()

    # projects_and_collabs = serializers.SerializerMethodField()
    class Meta:
        model = get_user_model()
        exclude = ['groups', 'is_active', 'is_staff', 'is_superuser', 'last_login', 'password', 'user_permissions', 'username', 'type']

    def get_projects(self, obj):
        # get the projects that the user owns
        # print(obj)
        # print(obj.email)
        projects = []
        collabs = Collaborator.objects.filter(collaborator=obj.pk, showProjectOnProfile=True)

        for collab in collabs:
            # print(collab.project)
            projects.append(ProjectShortSerializer(Project.objects.get(pk=collab.project.pk)).data)

        owned_projects = Project.objects.filter(owner=obj.pk)
        for project in owned_projects:
            projects.append(ProjectShortSerializer(project).data)
        return projects

        # also need to get the projects that the user is collaborating on
    def get_role(self, obj):
        return obj.get_role_display()


# Used for the user cards in the browse page
class UserShortSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    numProjects = serializers.SerializerMethodField('num_projects')

    class Meta:
        model = get_user_model()
        fields = ['pk', 'type', 'first_name', 'last_name', 'role', 'affiliation', 'locatedAtCornell', 'locatedAtCCE', 'researchInterests', 'location', 'email', 'numProjects', 'date_joined']

    def get_role(self, obj):
        return obj.get_role_display()

    def num_projects(self, obj):
        projects = []
        collabs = Collaborator.objects.filter(collaborator=obj.pk, showProjectOnProfile=True)

        for collab in collabs:
            # print(collab.project)
            projects.append(ProjectShortSerializer(Project.objects.get(pk=collab.project.pk)).data)

        owned_projects = Project.objects.filter(owner=obj.pk)
        for project in owned_projects:
            projects.append(ProjectShortSerializer(project).data)

        return len(projects)


class ProjectSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    owner = MiniUserSerializer(many=False, read_only=True)
    collaborators = serializers.SerializerMethodField()
    ageRanges = ast.literal_eval(ageRanges)
    researchTopics = ast.literal_eval(researchTopics)
    deliveryModes = ast.literal_eval(deliveryModes)

    class Meta:
        model = Project
        exclude = ['isApproved', 'type']

    def get_collaborators(self, obj):
        collaborator_queryset = Collaborator.objects.filter(project=obj)
        userInfo = []
        for collaborator in collaborator_queryset:
            if collaborator.showProjectOnProfile:
                userInfo.append(UserShortSerializer(PUser.objects.get(email=collaborator.collaborator)).data)
        # return CollaboratorSerializer(collaborators, many=True).data
        return userInfo

    def get_status(self, obj):
        return obj.get_status_display()
