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
router.register('like', post_views.LikeViewSet)
router.register('profile', user_views.ProfileViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/login/', user_views.MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
