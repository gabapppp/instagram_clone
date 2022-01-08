from rest_framework.serializers import ModelSerializer, RelatedField
from rest_framework import serializers
from homepage.models import Post
from users.models import Profile, Follower
from homepage.serializers import Follower, FollowerSerializer
from notifications.models import Notification
from django.contrib.auth import get_user_model, models

UserModel = get_user_model()


class ProfileSerializer(ModelSerializer):
    user = serializers.SlugRelatedField('username', read_only=True)
    id = serializers.ReadOnlyField(source='user.id')
    image = serializers.ImageField(read_only=True)
    class Meta:
        model= Profile
        fields = ['id', 'user', 'image']

class PostSerializer(ModelSerializer):
    class Meta:
        model= Post
        fields = ['id']
class GenericNotificationRelatedField(RelatedField):

    def to_representation(self, value):
        if isinstance(value, UserModel):
            queryset = Profile.objects.get(user=value)
            serializer = ProfileSerializer(queryset)
        if isinstance(value, Post):
            serializer = PostSerializer(value)
        if isinstance(value, Follower):
            serializer = FollowerSerializer(value)  
        return serializer.data


class NotificationSerializer(ModelSerializer):
    recipient = GenericNotificationRelatedField(read_only=True)
    actor = GenericNotificationRelatedField(read_only=True)
    unread = serializers.BooleanField()
    timestamp = serializers.DateTimeField(read_only=True)                                     
    target = GenericNotificationRelatedField(read_only=True)
    class Meta:
        model = Notification
        fields = ['id', 'recipient', 'actor', 'target', 'verb', 'level', 'description', 'unread', 'public', 'deleted',
                  'emailed', 'timestamp',]
