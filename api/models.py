from django.db import models
from django.contrib.auth.models import AbstractUser
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
    email = models.EmailField(unique=True)
    type = models.CharField(max_length=10)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Study(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    user = models.ForeignKey(PUser, on_delete=models.CASCADE)