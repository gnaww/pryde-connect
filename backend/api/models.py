from django.db import models
from django_mysql.models import EnumField, ListCharField, JSONField, Model
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import BaseUserManager
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )
        user.username = email
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class PUser(AbstractUser):
    ROLE = [
        ("1", 'Practitioner'),
        ("2", 'Researcher')
    ]
    locatedAtCornell = models.BooleanField(default=False)
    locatedAtCCE = models.BooleanField(default=False)
    role = EnumField(choices=ROLE, default=None, null=True)
    displayRole = models.CharField(max_length=50, default=None, null=True)
    affiliation = models.CharField(max_length=200)
    location = models.CharField(max_length=200, null=True, default=None)
    email = models.EmailField(unique=True)
    phone = PhoneNumberField(default=None, null=True, unique=False, blank=True)
    website = models.URLField(default=None, null=True, blank=True)
    researchDescription = models.TextField(null=True, blank=True)
    roles = ListCharField(
        base_field=models.CharField(max_length=100),
        default=list,
        null=True,
        max_length=(7 * 101) # 7 * 100 character nominals, plus commas
    )
    ageRanges = ListCharField(
        base_field=models.CharField(max_length=100),
        default=list,
        null=True,
        max_length=(9 * 101) # 9 * 100 character nominals, plus commas
    )
    deliveryModes = ListCharField(
        base_field=models.CharField(max_length=100),
        default=list,
        null=True,
        max_length=(5 * 101) # 5 * 100 character nominals, plus commas
    )
    researchNeeds = models.TextField(null=True, blank=True)
    evaluationNeeds = models.TextField(null=True, blank=True)
    # TODO: add profile picture to users
    # profilePicture = models.FileField(upload_to="uploads/")
    type = models.CharField(max_length=15, default='user')
    over18 = models.BooleanField(default=True)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class ResearchInterestUser(Model):
    user = models.ForeignKey(PUser, on_delete=models.CASCADE)
    researchInterest = models.CharField(max_length=100)


class Project(Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(PUser, related_name='projects', on_delete=models.CASCADE)
    STATUS = [
        ("1", 'Completed'),
        ("2", 'In Progress'),
        ("3", 'Not Started'),
    ]
    status = EnumField(choices=STATUS)
    summary = models.TextField()
    ageRanges = ListCharField(
        base_field=models.CharField(max_length=100),
        default=None,
        max_length=(9 * 101) # 9 * 100 character nominals, plus commas
    )
    timeline = models.CharField(max_length=100)
    commitmentLength = models.CharField(max_length=100)
    incentives = models.TextField()
    additionalInformation = models.TextField(null=True, blank=True)
    type = models.CharField(max_length=100, default='project')
    datePosted = models.DateTimeField(auto_now_add=True)
    alternateContact = JSONField(default=dict)
    alternateLocation = models.CharField(max_length=200, null=True, blank=True, default=None)
    isApproved = models.BooleanField(default=True)


class TopicsProject(Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    researchTopic = models.CharField(max_length=100)


class DeliveryModeProject(Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    deliveryMode = models.CharField(max_length=100)


class Collaborator(Model):
    collaborator = models.ForeignKey(PUser, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    editPermission = models.BooleanField()
    deletePermission = models.BooleanField()
    editCollaboratorsPermission = models.BooleanField()
    showProjectOnProfile = models.BooleanField(default=True)


class File(Model):
    user = models.ForeignKey(PUser, on_delete=models.CASCADE)
    file = models.FileField(upload_to='uploads/')


class ProfilePicture(Model):
    user = models.ForeignKey(PUser, on_delete=models.CASCADE)
    file = models.FileField(blank=False, null=False, upload_to='profile_pictures')
    uploaded_at = models.DateTimeField(auto_now_add=True)