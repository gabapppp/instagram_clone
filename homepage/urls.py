from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views as post_views
from users import views as user_views
from directmessages.views import MessageViewSet
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register('posts', post_views.PostViewSet)
router.register('comments', post_views.CommentViewSet)
router.register('like', post_views.LikeViewSet)
router.register('profile', user_views.ProfileViewSet)
router.register('messages', MessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', user_views.RegisterView.as_view(), name='register'),
    path('login/', user_views.MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]