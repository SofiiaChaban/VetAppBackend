from rest_framework import serializers
from .models import *
from allauth.account.adapter import get_adapter
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token


class AdvertismentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Advertisment
        fields = ('id','title','doctor','phone','email','freetime','city','type')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email', 'username', 'password', 'is_vet', 'is_client')


class CustomRegisterSerializer(RegisterSerializer):
    is_vet = serializers.BooleanField()
    is_client = serializers.BooleanField()

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'is_vet', 'is_client')

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'is_vet': self.validated_data.get('is_vet', ''),
            'is_client': self.validated_data.get('is_client', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.is_vet = self.cleaned_data.get('is_vet')
        user.is_client = self.cleaned_data.get('is_client')
        print(user.is_vet)
        print(user.is_client)
        user.save()
        adapter.save_user(request, user, self)

        if user.is_vet:
            Vet.objects.create(user=user)
        return user



class VetSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Vet
        fields = ('user',)


class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'


class TokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Token
        fields = ('key', 'user')



