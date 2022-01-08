from rest_framework import serializers
from drf_extra_fields import fields
from .models import *
from users.serializers import FollowerSerializer, ProfileSerializer
from users.models import Follower

class PostImageSerializer(serializers.ModelSerializer):
    modelimage = fields.Base64ImageField()
    class Meta:
        model = PostImage
        fields = ['pk', 'modelimage']
    

class PostSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True)
    user = serializers.SlugRelatedField('username', read_only=True)
    likes_count = serializers.IntegerField(read_only=True)
    comments_count = serializers.IntegerField(read_only=True)
    isLike = serializers.SerializerMethodField()
    avt = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['pk', 'user', 'caption', 'date_posted', 'images', 'likes_count', 'comments_count', 'isLike', 'avt']

    def get_isLike(self, post):
        return post.likes.filter(liker=self.context['request'].user).exists()
    
    def get_avt(self, post):
        return post.user.profile.image.url

    def create(self, validated_data):
        images = validated_data.pop('images')
        post = Post.objects.create(**validated_data)
        PostImage.objects.bulk_create([PostImage(post=post, **modelimage) for modelimage in images])
        return post

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField('username', read_only=True)
    avt = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = ['user','avt', 'post' ,'content', 'date_created']
        
    def get_avt(self, post):
        return post.user.profile.image.url

class LikeSerializer(serializers.ModelSerializer):
    liker = serializers.SlugRelatedField('username', read_only=True)

    class Meta:
        model = Like
        fields = ['pk', 'post', 'liker', 'date_created']
