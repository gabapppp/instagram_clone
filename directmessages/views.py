from users import views
from django.dispatch.dispatcher import receiver
from django_filters import filterset
from rest_framework import serializers, viewsets, mixins, permissions, response
from .models import Message
from .serializers import MessageSerializer
from .filters import MessageFilterSet
from django.contrib.auth.models import User

# Create your views here.


class InboxViewSet(viewsets.ReadOnlyModelViewSet, mixins.CreateModelMixin):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    filterset_class = MessageFilterSet
    permission_classes = [permissions.IsAuthenticated,]

    def get_queryset(self):
        queryset = super().get_queryset()
        
        if self.action == 'list' \
                and self.request.query_params.get('receiver', '').strip() == '' \
                and self.request.query_params.get('inbox', '').strip() == '':
            queryset = queryset.none()
        elif not self.request.query_params.get('receiver', '').strip() == '':
            queryset = queryset.filter(sender=self.request.user)

        return queryset

    def perform_create(self, serializer):
        serializer.save(
            sender = self.request.user,
            receiver = User.objects.filter(username=self.request.query_params.get('receiver', '').strip()).get()
            )
