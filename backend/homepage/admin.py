from django.contrib import admin
from django.db.models.fields import CommaSeparatedIntegerField
from .models import Post, PostImage, Comment, Like

# Register your models here.
class PostImageInLine(admin.TabularInline):
    model = PostImage

class PostAdmin(admin.ModelAdmin):
    inlines = [PostImageInLine]


admin.site.register(Post, PostAdmin)
admin.site.register(Comment)
admin.site.register(Like)