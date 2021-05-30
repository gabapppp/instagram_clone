from re import I
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import Follower, Profile
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer



class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'}, validators=[validate_password])
    confirm_password = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password', 'confirm_password']
        extra_kwargs = {
            'first_name': {'required' : True},
            'last_name': {'required' : True},
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password fields didn't match"})
        
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        Profile.objects.create(user=user)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField(source='user.email')
    first_name = serializers.ReadOnlyField(source='user.first_name')
    last_name = serializers.ReadOnlyField(source='user.last_name')
    username = serializers.ReadOnlyField(source='user.username')
    following = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [ 'username', 'first_name', 'last_name', 'email', 'following']
    
    def get_following(self, profile):
        return profile.user.following.filter(follower=self.context['request'].user).exists()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token



