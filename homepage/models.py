from django.db import models
from django.contrib.auth.models import User
from notifications.signals import notify
from django.utils.text import Truncator

    
# models from my understanding are the location of all the info about your data. you use it to make databases

class Post(models.Model):
    caption = models.CharField(max_length=2200, blank=True)  # caption is a field in this Post model. it specifies a class attribute Charfield and represents a database column. blank=True lets the field be optional left empty
    date_posted = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # foreign key calls on an outside model whether imported or in this file, CASCADE will delete the post if

    def __str__(self):
        return self.caption

class PostImage(models.Model):
    post = models.ForeignKey(Post, related_name='images', on_delete=models.CASCADE)
    modelimage = models.ImageField(upload_to='media/post_images')
    

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    content = models.CharField(max_length=500, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        return f'Comment from {self.user} on {self.post}'

    def save(self, *args, **kwargs):
        super(Comment, self).save(*args, **kwargs)
        n = 4
        truncatewords = Truncator(self.content).words(n)
        if (self.user != self.post.user):
            notify.send(self.user, recipient=self.post.user, verb='commented "' + truncatewords + '" on your post!', action_object=self.post, description='comment', target=self)


class Like(models.Model):
    liker = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Like from {self.liker} on {self.post}'

    def save(self, *args, **kwargs):
        super(Like, self).save(*args, **kwargs)
        if(self.liker != self.post.user):
            notify.send(self.liker, recipient=self.post.user, verb='liked your post!', action_object=self.post, description='like', target=self.pk)