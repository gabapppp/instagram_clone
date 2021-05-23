import django_filters
from .models import Message
from django.db.models import Q

class MessageFilterSet(django_filters.FilterSet):
    receiver = django_filters.CharFilter('receiver__username')
    inbox = django_filters.BooleanFilter(method='filter_user_inbox')
    class Meta:
        model = Message
        fields = ['receiver', 'inbox']

    def filter_user_inbox(self, queryset, name, value):
        if value:
            queryset = queryset.filter(Q(receiver=self.request.user)|Q(sender=self.request.user))
        return queryset