from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views as post_views
from users import views as user_views
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register('posts', post_views.PostViewSet)
router.register('comments', post_views.CommentViewSet)
router.register('likes', post_views.LikeViewSet)
router.register('profile', user_views.ProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('changepassword/', user_views.ChangePasswordView.as_view(), name='change_password'),
    path('register/', user_views.RegisterView.as_view(), name='register'),
    path('token/', user_views.MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]
