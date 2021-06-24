from django.urls import path
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('', NotificationViewSet)

app_name = 'notifications_rest'
urlpatterns = [
    path('all/', AllNotification.as_view({'get': 'list'}), name='all'),
    path('unread/', UnreadNotificationsList.as_view({'get': 'list'}), name='unread'),
    path('mark-all-as-read/', MarkAllAsRead.as_view(), name='mark_all_as_read'),
    path('mark-as-read/<int:pk>/', MarkAsRead.as_view(), name='mark_as_read'),
    path('mark-as-unread/<int:pk>/', MarkAsUnread.as_view(), name='mark_as_unread'),
    path('delete/<int:pk/', Delete.as_view(), name='delete'),
    path('api/unread_count/', UnreadNotificationCount.as_view(), name='live_unread_notification_count'),
    path('api/all_count/', AllNotificationCount.as_view(), name='live_all_notification_count'),
    path('api/unread_list/', UnreadNotificationsList.as_view({'get': 'list'}), name='live_unread_notification_list'),
]