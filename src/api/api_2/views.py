
from rest_framework import viewsets
from main.models import Comment
from .serializers import CommentSerializer
from main.api.permissions import IsAuthenticatedUser

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedUser]