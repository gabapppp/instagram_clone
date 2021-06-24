from rest_framework import viewsets, mixins, permissions, status, decorators, response, permissions, filters
from django.db.models import aggregates
from rest_framework.generics import CreateAPIView
from django.contrib import auth
from .models import * 
from .serializers import * 
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from django.db.models import Q

# Create your views here.   
class MyObtainTokenPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    
class RegisterView(CreateAPIView):
    queryset = auth.get_user_model().objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class ProfileViewSet(viewsets.ReadOnlyModelViewSet, mixins.RetrieveModelMixin):
    queryset = Profile.objects.annotate(
        following_count = aggregates.Count('user__followers', distinct=True)-1,
        follower_count = aggregates.Count('user__followings', distinct=True)-1,
    )
    serializer_class = ProfileSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = [filters.SearchFilter]
    search_fields= ['user__username']
    lookup_field = 'user__username'
    
    @decorators.action(detail=False, methods=('get',))
    def me(self, request):
        queryset=Profile.objects.annotate(
        following_count = aggregates.Count('user__followings', distinct=True)-1,
        follower_count = aggregates.Count('user__followers', distinct=True)-1,
    ).get(user=self.request.user)
        serializer = self.get_serializer(instance=queryset)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

    @decorators.action(detail=True, methods=('post',))
    def follow(self, request, user__username=None):
        profile = self.get_object()
        follow = request.user.followers.create(following=profile.user)

        return response.Response(data={'id': follow.id}, status=status.HTTP_201_CREATED)

    @decorators.action(detail=True, methods=('delete',))
    def unfollow(self, request, user__username=None):
        user = self.get_object()
        request.user.followers.filter(following=user.user).delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT)
    