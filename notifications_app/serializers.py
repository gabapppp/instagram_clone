from rest_framework.serializers import ModelSerializer, RelatedField
from rest_framework import serializers
from homepage.serializers import LikeSerializer, CommentSerializer, Like, Comment
from homepage.serializers import Follower, FollowerSerializer
from notifications.models import Notification
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class UserSerializer(ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = UserModel
        fields = ['id', 'username']


class GenericNotificationRelatedField(RelatedField):

    def to_representation(self, value):
        if isinstance(value, UserModel):
            serializer = UserSerializer(value)
        if isinstance(value, Like):
            serializer = LikeSerializer(value)  
        if isinstance(value, Comment):
            serializer = CommentSerializer(value)
        if isinstance(value,Follower):
            serializer = FollowerSerializer(value)  
        return serializer.data


class NotificationSerializer(ModelSerializer):
    recipient = UserSerializer()
    actor = UserSerializer()
    unread = serializers.BooleanField()
    timestamp = serializers.DateTimeField(read_only=True)                                     
    target = GenericNotificationRelatedField(read_only=True)
    class Meta:
        model = Notification
        fields = ['id', 'recipient', 'actor', 'target', 'verb', 'level', 'description', 'unread', 'public', 'deleted',
                  'emailed', 'timestamp',]
