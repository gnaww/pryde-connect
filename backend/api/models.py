from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField
from allauth.account.models import EmailAddress
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import BaseUserManager
from django.utils import timezone

from django.core.validators import validate_image_file_extension
from .validators import validate_file_size

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


# Include only non-staff users with verified emails
class PublicUserManager(BaseUserManager):
    def get_queryset(self):
        return super().get_queryset().filter(emailaddress__verified=True, is_staff=False)


# Model representing users
class PUser(AbstractUser):
    ROLE = [
        (1, 'Practitioner'),
        (2, 'Researcher')
    ]
    locatedAtCornell = models.BooleanField(default=False)
    locatedAtCCE = models.BooleanField(default=False)
    role = models.IntegerField(choices=ROLE, default=None, null=True)
    displayRole = models.CharField(max_length=50, default=None, null=True)
    affiliation = models.CharField(max_length=200)
    location = models.CharField(max_length=200, null=True, default=None)
    email = models.EmailField(unique=True)
    phone = PhoneNumberField(default=None, null=True, unique=False, blank=True)
    website = models.URLField(default=None, null=True, blank=True)
    researchDescription = models.TextField(null=True, blank=True)
    roles = ArrayField(models.CharField(max_length=100), default=list, null=True, blank=True)
    researchNeeds = models.TextField(null=True, blank=True)
    evaluationNeeds = models.TextField(null=True, blank=True)
    profile_picture = models.ImageField(default='', upload_to="profile_pictures/", null=True, blank=True)
    type = models.CharField(max_length=15, default='user')
    over18 = models.BooleanField(default=True)

    objects = UserManager()
    public_objects = PublicUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return "%s %s (%s)" % (self.first_name, self.last_name, self.email)


# Model representing the research interests of users
class ResearchInterestUser(models.Model):
    user = models.ForeignKey(PUser, on_delete=models.CASCADE)
    researchInterest = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'user research interest'
        verbose_name_plural = 'User Research Interests'

    def __str__(self):
        return "%s: %s" % (self.researchInterest, self.user)


# Model representing the delivery modes of users
class DeliveryModeUser(models.Model):
    user = models.ForeignKey(PUser, on_delete=models.CASCADE)
    deliveryMode = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'user delivery mode'
        verbose_name_plural = 'User Delivery Modes'

    def __str__(self):
        return "%s: %s" % (self.deliveryMode, self.user)


# Model representing the age ranges of users
class AgeRangeUser(models.Model):
    user = models.ForeignKey(PUser, on_delete=models.CASCADE)
    ageRange = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'user age range'
        verbose_name_plural = 'User Age Ranges'

    def __str__(self):
        return "%s: %s" % (self.ageRange, self.user)


# Model representing projects
class Project(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(PUser, related_name='projects', on_delete=models.CASCADE)
    STATUS = [
        ("1", 'Completed'),
        ("2", 'In Progress'),
        ("3", 'Not Started'),
    ]
    status = models.IntegerField(choices=STATUS)
    summary = models.TextField()
    timeline = models.CharField(max_length=100)
    commitmentLength = models.CharField(max_length=100)
    incentives = models.TextField()
    additionalInformation = models.TextField(null=True, blank=True)
    type = models.CharField(max_length=100, default='project')
    datePosted = models.DateTimeField(auto_now_add=True)
    alternateContact = JSONField(default=dict)
    alternateLocation = models.CharField(max_length=200, null=True, blank=True, default=None)
    isApproved = models.BooleanField(default=True)

    def __str__(self):
        return "%s by %s" % (self.name, self.owner)


# Model representing the research topics of projects
class TopicsProject(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    researchTopic = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'project research topic'
        verbose_name_plural = 'Project Research Topics'

    def __str__(self):
        return "%s: %s" % (self.researchTopic, self.project)


# Model representing the delivery modes of projects
class DeliveryModeProject(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    deliveryMode = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'project delivery mode'
        verbose_name_plural = 'Project Delivery Modes'

    def __str__(self):
        return "%s: %s" % (self.deliveryMode, self.project)


# Model representing age ranges of projects
class AgeRangeProject(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    ageRange = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'project age range'
        verbose_name_plural = 'Project Age Ranges'

    def __str__(self):
        return "%s: %s" % (self.ageRange, self.project)


# Model representing collaborators on projects
class Collaborator(models.Model):
    collaborator = models.ForeignKey(PUser, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    editPermission = models.BooleanField()
    deletePermission = models.BooleanField()
    editCollaboratorsPermission = models.BooleanField()
    showProjectOnProfile = models.BooleanField(default=True)


# Model representing user email subscription preferences
class UserEmailPreference(models.Model):
    user = models.ForeignKey(PUser, on_delete=models.CASCADE)
    type = models.IntegerField(choices=[("1", "project"), ("2", "user")])
    preferenceName = models.CharField(max_length=100)
    preferenceValue = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = 'User Email Preferences'


# Model representing additional files attached to projects
class File(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    file = models.FileField(upload_to='project_files/', validators=[validate_file_size, ])
    file_name = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'additional project file'
        verbose_name_plural = 'Additional Project Files'

    def __str__(self):
        return "%s: %s" % (self.file_name, self.project)
