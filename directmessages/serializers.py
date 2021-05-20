from rest_framework import serializers
from .models import Message
from django.contrib.auth.models import User

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField('username', read_only=True)
    receiver = serializers.SlugRelatedField('username', read_only=True)
    class Meta:
        model = Message
        fields = ['sender', 'receiver', 'content', 'date_created']

