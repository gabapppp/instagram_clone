import django_filters
from .models import Post, Comment, Like

class PostFilterSet(django_filters.FilterSet):
    username = django_filters.CharFilter('author__username')
    feed = django_filters.BooleanFilter(method='filter_user_feed')

    class Meta:
        model = Post
        fields = ('username', 'feed')

    def filter_user_feed(self, queryset, name, value):
        if value:
            queryset = queryset.filter(author__follower__followee=self.request.user)

        return queryset


class CommentFilterSet(django_filters.FilterSet):
    class Meta:
        model = Comment
        fields = ('post',)


class LikeFilterSet(django_filters.FilterSet):
    class Meta:
        model = Like
        fields = ('post', 'liker')