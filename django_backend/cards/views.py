from rest_framework import generics, permissions
from .models import Card
from .serializers import CardSerializer


class CardListCreateView(generics.ListCreateAPIView):
    """
    List all cards belonging to the logged-in user
    or create a new card.
    """

    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Card.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CardDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a card belonging
    to the logged-in user.
    """

    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Card.objects.filter(user=self.request.user)
