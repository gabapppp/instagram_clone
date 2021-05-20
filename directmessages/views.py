from users import views
from django.dispatch.dispatcher import receiver
from django_filters import filterset
from rest_framework import serializers, viewsets, mixins, permissions
from .models import Message
from .serializers import MessageSerializer
import django_filters



# This is create filterset.
class MessageFilterSet(django_filters.FilterSet):
    receiver = django_filters.CharFilter('receiver__username')
    class Meta:
        model = Message
        fields = ['receiver',]

# Create your views here.
class MessageViewSet(viewsets.ReadOnlyModelViewSet, mixins.CreateModelMixin):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    filterset_class = MessageFilterSet
    permission_classes = [permissions.IsAuthenticated,]

    def get_queryset(self):
        queryset = super().get_queryset()

        if self.action == 'list' and self.request.query_params.get('receiver', '').strip() == '':
            return queryset.none()

        return queryset.filter(sender=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(sender = self.request.user)