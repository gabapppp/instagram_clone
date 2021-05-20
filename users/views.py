from rest_framework import viewsets, mixins, permissions, status, decorators, response, permissions
from rest_framework.generics import CreateAPIView
from django.contrib import auth
from .models import * 
from .serializers import * 
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer

# Create your views here.   
class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]
    serializer_class = MyTokenObtainPairSerializer
    
    
class RegisterView(CreateAPIView):
    queryset = auth.get_user_model().objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class ProfileViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    lookup_field = 'user__username'

    
    @decorators.action(detail=False, methods=('get',))
    def me(self, request):
        serializer = self.get_serializer(instance=self.request.user)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

    @decorators.action(detail=True, methods=('post',))
    def follow(self, request, user__username=None):
        user = self.get_object()
        follow = request.user.followers.create(following=user.user)

        return response.Response(data={'id': follow.id}, status=status.HTTP_201_CREATED)

    @decorators.action(detail=True, methods=('delete',))
    def unfollow(self, request, username=None):
        request.user.following.filter(following__username=username).delete()

        return response.Response(status=status.HTTP_204_NO_CONTENT)
    