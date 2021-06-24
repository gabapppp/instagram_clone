from django.urls import re_path as url
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('', NotificationViewSet)

app_name = 'notifications_rest'
urlpatterns = [
    url('all/', AllNotification.as_view({'get': 'list'}), name='all'),
    url('unread/', UnreadNotificationsList.as_view({'get': 'list'}), name='unread'),
    url('mark-all-as-read/$', MarkAllAsRead.as_view(), name='mark_all_as_read'),
    url('mark-as-read/(?P<slug>\d+)/$', MarkAsRead.as_view(), name='mark_as_read'),
    url('mark-as-unread/(?P<slug>\d+)/$', MarkAsUnread.as_view(), name='mark_as_unread'),
    url('delete/(?P<slug>\d+)/$', Delete.as_view(), name='delete'),
    url('api/unread_count/$', UnreadNotificationCount.as_view(), name='live_unread_notification_count'),
    url('api/all_count/$', AllNotificationCount.as_view(), name='live_all_notification_count'),
    url('api/unread_list/$', UnreadNotificationsList.as_view({'get': 'list'}), name='live_unread_notification_list'),
]