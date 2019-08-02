from rest_framework import serializers
from rest_framework.fields import ListField
from django.contrib.auth import get_user_model
from .models import PUser, Project, Collaborator, TopicsProject, DeliveryModeProject, ResearchInterestUser



class DeliveryModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryModeProject
        fields = '__all__'

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicsProject
        fields = '__all__'


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
    visible = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['pk', 'type', 'name', 'owner', 'status', 'summary', 'ageRanges', 'researchTopics', 'deliveryModes', 'datePosted', 'datePosted', 'visible']

    def get_status(self, obj):
        return obj.get_status_display()

    def get_ageRanges(self, obj):
        return obj.ageRanges

    def get_researchTopics(self, obj):
        array = []
        topics = TopicsProject.objects.filter(project=obj)
        for topic in topics:
            array.append(topic.researchTopic)
        return array

    def get_deliveryModes(self, obj):
        array = []
        deliveryModes = DeliveryModeProject.objects.filter(project=obj)
        for mode in deliveryModes:
            array.append(mode.deliveryMode)
        return array

    def get_visible(self, obj):
        if 'visible' in self.context:
            return self.context['visible']
        else:
            return True


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
            projects.append(ProjectShortSerializer(Project.objects.get(pk=collab.project.pk), isApproved=True).data)

        owned_projects = Project.objects.filter(owner=obj.pk, isApproved=True)

        for project in owned_projects:
            projects.append(ProjectShortSerializer(project).data)

        return projects

    def get_role(self, obj):
        return obj.get_role_display()

    def get_researchInterests(self, obj):
            array = []
            interests = ResearchInterestUser.objects.filter(user=obj)
            for interest in interests:
                array.append(interest.researchInterest)
            return array

    def get_roles(self, obj):
        return obj.roles

    def get_ageRanges(self, obj):
        return obj.ageRanges

    def get_deliveryModes(self, obj):
        return obj.deliveryModes


class LoggedInUserSerializer(UserSerializer):
    def get_projects(self, obj):
        projects = []
        collabs = Collaborator.objects.filter(collaborator=obj.pk)

        for collab in collabs:
            if collab.showProjectOnProfile:
                projects.append(ProjectShortSerializer(Project.objects.get(pk=collab.project.pk, isApproved=True), context={'visible': True}).data)
            else:
                projects.append(ProjectShortSerializer(Project.objects.get(pk=collab.project.pk, isApproved=True), context={'visible': False}).data)

        owned_projects = Project.objects.filter(owner=obj.pk, isApproved=True)

        for project in owned_projects:
            projects.append(ProjectShortSerializer(project).data)

        return projects


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
        total = 0
        collabs = Collaborator.objects.filter(collaborator=obj.pk, showProjectOnProfile=True)
        total += len(collabs)
        owned_projects = Project.objects.filter(owner=obj.pk, isApproved=True)
        total += len(owned_projects)

        return total

    def get_researchInterests(self, obj):
            array = []
            interests = ResearchInterestUser.objects.filter(user=obj)
            for interest in interests:
                array.append(interest.researchInterest)
            return array


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
        collaborator_queryset = Collaborator.objects.filter(project=obj, showProjectOnProfile=True)
        collaborators = []
        for collaborator in collaborator_queryset:
            collaborators.append(UserShortSerializer(PUser.objects.get(email=collaborator.collaborator)).data)
        return collaborators

    def get_status(self, obj):
        return obj.get_status_display()

    def get_ageRanges(self, obj):
        return obj.ageRanges

    def get_researchTopics(self, obj):
        array = []
        topics = TopicsProject.objects.filter(project=obj)
        for topic in topics:
            array.append(topic.researchTopic)
        return array

    def get_deliveryModes(self, obj):
        array = []
        deliveryModes = DeliveryModeProject.objects.filter(project=obj)
        for mode in deliveryModes:
            array.append(mode.deliveryMode)
        return array


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
