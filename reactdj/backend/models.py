from django.db import models
from django.contrib.auth.models import AbstractUser


class Advertisment(models.Model):
    title = models.CharField(max_length=70,blank=False,default='')
    doctor = models.CharField(max_length=100,blank=False)
    phone = models.CharField(max_length=15,blank=False)
    email = models.CharField(max_length=70,blank=False)
    freetime = models.CharField(max_length=70,blank=False,default='')
    city = models.CharField(max_length=70,default='')
    type = models.CharField(max_length=70,default='')


class User(AbstractUser):

    def __str__(self):
        return self.username


class Vet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Pet(models.Model):
    name = models.CharField(max_length=100)
    age = models.CharField(max_length=100,default=None)
    type = models.CharField(max_length=100)
    gender = models.CharField(max_length=25)

    def __str__(self):
        return self.name
