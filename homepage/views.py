from django.db.models import aggregates
from rest_framework import viewsets, mixins
from .permissions import AuthenticatedCreation, AuthorDeletion
from .models import *
from .serializers import *
from .filters import PostFilterSet, LikeFilterSet, CommentFilterSet
from .pagination import PostPagination

# Create your views here.
class PostViewSet(viewsets.ReadOnlyModelViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin):
    queryset = Post.objects.annotate(
        likes_count = aggregates.Count('likes', distinct=True),
        comments_count = aggregates.Count('comments', distinct=True),
    )
    serializer_class = PostSerializer
    filterset_class = PostFilterSet
    permission_classes = [AuthenticatedCreation, AuthorDeletion]
    pagination_class = PostPagination


    def get_queryset(self):
        queryset = super().get_queryset()

        if self.action == 'list' \
                and self.request.query_params.get('username', '').strip() == '' \
                and self.request.query_params.get('feed', '').strip() == '':
            queryset = queryset.none()

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, modelimage=self.request.data.get('images'))


class CommentViewSet(viewsets.ReadOnlyModelViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filterset_class = CommentFilterSet
    permission_classes = [AuthenticatedCreation, AuthorDeletion]

    def get_queryset(self):
        queryset = super().get_queryset()

        if self.action == 'list' and self.request.query_params.get('post', '').strip() == '':
            queryset = queryset.none()

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LikeViewSet(viewsets.ReadOnlyModelViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    filterset_class = LikeFilterSet
    permission_classes = (AuthenticatedCreation, AuthorDeletion)


    def get_queryset(self):
        queryset = super().get_queryset()

        if self.action == 'list' and self.request.query_params.get('post', '').strip() == '':
            queryset = queryset.none()

        return queryset

    def perform_create(self, serializer):
        serializer.save(liker=self.request.user)
    