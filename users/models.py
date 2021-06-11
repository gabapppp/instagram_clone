from django.db import models
from django.contrib.auth.models import User
from PIL import Image
from notifications.signals import notify


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='media/default.png', upload_to='media/profile_pics')
    bio = models.CharField(max_length=150, blank=True)
    # bio is a field in this Post model. it specifies a class attribute Charfield and represents a database column

    def __str__(self):
        return f'{self.user.username} Profile'
    def save(self,  *args, **kwargs):
        super(Profile, self).save(*args, **kwargs)

        img = Image.open(self.image.path)
        if img.height >300 or img.width >300:
            output_size = (300,300)
            img.thumbnail(output_size)
            img.save(self.image.path)

class Follower(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    date_followed = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.follower} follows {self.following}'

    def save(self, *args, **kwargs):
        super(Follower, self).save(*args, **kwargs)
        notify.send(self.follower, recipient=self.following, verb='followed you!', description='follow', target=self)
