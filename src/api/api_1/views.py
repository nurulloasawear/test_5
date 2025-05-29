
from rest_framework import viewsets
from main.models import Post
from .serializers import PostSerializer
from main.api.permissions import IsAuthenticatedUser

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedUser]