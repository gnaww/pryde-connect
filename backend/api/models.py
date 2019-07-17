from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import BaseUserManager


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


# TODO: should probably rethink the names of the fields in the PUser model, especially the role related fields
class PUser(AbstractUser):
    ROLE = (
        (1, 'Practitioner'),
        (2, 'Researcher')
    )
    role = models.IntegerField(choices=ROLE, default=None, null=True)
    DISPLAY_ROLE = (
        (1, '4-H Educator'),
        (2, 'Other CCE Role'),
        (3, 'Practice Focused Role'),
        (4, 'Cornell Faculty'),
        (5, 'Cornell Student'),
        (6, 'Research Focused Role'),
        (7, '4-H Practitioner')
    )
    displayRole = models.IntegerField(choices=DISPLAY_ROLE, default=None, null=True)
    affiliation = models.CharField(max_length=100)
    location = models.CharField(max_length=30, null=True, default=None)
    email = models.EmailField(unique=True)
    phone = PhoneNumberField(default=None, null=True, unique=False)
    website = models.URLField(default=None, null=True)
    researchInterests = ArrayField(models.CharField(max_length=100), default=list, null=True)
    researchDescription = models.TextField()
    roles = ArrayField(models.CharField(max_length=100), default=list, null=True)
    ageRanges = ArrayField(models.CharField(max_length=100), default=list, null=True)
    youthProgramTypes = ArrayField(models.CharField(max_length=100), default=list, null=True)
    deliveryModes = ArrayField(models.CharField(max_length=100), default=list, null=True)
    researchNeeds = ArrayField(models.CharField(max_length=100), default=list, null=True)
    evaluationNeeds = ArrayField(models.CharField(max_length=100), default=list, null=True)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


# TODO: figure out difference between collaborators/owners, are they equivalent
#  and will collaborators have the project show up on their profile?
class Project(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(PUser, related_name='projects', on_delete=models.CASCADE)
    STATUS = (
        (1, 'completed'),
        (2, 'in-progress'),
        (3, 'not-started'),
    )
    status = models.IntegerField(choices=STATUS, default=None, null=True)
    summary = models.TextField()
    researchTopics = ArrayField(models.CharField(max_length=100), default=None)
    ageRanges = ArrayField(models.CharField(max_length=100), default=None)
    deliveryModes = ArrayField(models.CharField(max_length=100), default=None)
    timeline = models.CharField(max_length=100)
    commitmentLength = models.CharField(max_length=100)
    incentives = ArrayField(models.CharField(max_length=100), default=None)
    # collaborators = ArrayField(models.ForeignKey(PUser, on_delete=models.CASCADE))
    additionalInformation = models.TextField()
    additionalFiles = ArrayField(models.FileField(upload_to='uploads/'), default=None)
