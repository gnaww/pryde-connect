from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.


import datetime
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


class PUser(AbstractUser):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    # email = models.EmailField(unique=True, primary_key=False)
    email = models.EmailField(unique=True)
    phone_number = PhoneNumberField(default=None, null=True, unique=False)
    website = models.URLField(default=None, null=True)
    ROLE = (
        (1, '4H Educator'),
        (2, 'Other CCE Role'),
        (3, 'Practice Focused Role'),
        (4, 'Cornell Faculty'),
        (5, 'Cornell Student'),
        (6, 'Research Focused Role')
    )
    role = models.IntegerField(choices=ROLE, default=None, null=True)
    college = models.CharField(max_length=30, null=True, default=None)
    department = models.CharField(max_length=30, null=True, default=None)
    institution = models.CharField(max_length=30, null=True, default=None)
    location = models.CharField(max_length=30, null=True, default=None)
    ROLE2 = (
        (1, 'Faculty'),
        (2, 'Academic Staff'),
        (3, 'Postdoctoral Fellow'),
        (4, 'Grad Student'),
        (5, 'Undergrad Student')
    )
    role2 = models.IntegerField(choices=ROLE2, null=True, default=None)

    topics = models.CharField(max_length=200, null=True, default=None)
    research_interests = models.CharField(max_length=1000, null=True, default=None)

    is_coop = models.BooleanField(default=False)

    role3 = models.CharField(max_length=200, null=True, default=None)

    age_work_with = models.CharField(max_length=200, null=True, default=None)

    type_youth_programs = models.CharField(max_length=200, null=True, default=None)

    program_delivery_models = models.CharField(max_length=200, null=True, default=None)

    research_needs = models.CharField(max_length=2000, null=True, default=None)
    evaluation_needs = models.CharField(max_length=2000, null=True, default=None)

    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Project(models.Model):
    user = models.ForeignKey(PUser, related_name='studies', on_delete=models.CASCADE)
    name_of_study = models.CharField(max_length=100)
    collaborators = models.CharField(max_length=100)
    status = models.BooleanField()
    research_topics = models.CharField(max_length=100)
    age_youth = models.CharField(max_length=100)
    goal = models.CharField(max_length=100)
    timeline = models.CharField(max_length=100)
    participant_involvement = models.CharField(max_length=100)
    incentives = models.CharField(max_length=100)
    incentives_participants = models.CharField(max_length=100)
    delivery_models = models.CharField(max_length=100)
    additional_desc = models.CharField(max_length=100, default=None, null=True)
    website = models.CharField(max_length=100, default=None, null=True)


