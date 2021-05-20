from rest_framework import serializers
from drf_extra_fields import fields
from .models import *

class PostImageSerializer(serializers.ModelSerializer):
    modelimage = fields.Base64ImageField()
    class Meta:
        model = PostImage
        fields = ['id' ,'modelimage']
    

class PostSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True) 
    user = serializers.SlugRelatedField('username', read_only=True)
    likes_count = serializers.IntegerField(read_only=True)
    comments_count = serializers.IntegerField(read_only=True)
    class Meta:
        model = Post
        fields = ['pk', 'user', 'caption', 'date_posted', 'images', 'likes_count', 'comments_count']

    def create(self, validated_data):
        images = validated_data.pop('images')
        post = Post.objects.create(**validated_data)
        PostImage.objects.bulk_create([models.Image(post=post, **image) for image in images])
        return post

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField('username', read_only=True)
    class Meta:
        model = Comment
        fields = ['user', 'post' ,'content', 'date_created']

class LikeSerializer(serializers.ModelSerializer):
    liker = serializers.SlugRelatedField('username', read_only=True)
    class Meta:
        model = Like
        fields = ['post', 'liker', 'date_created']