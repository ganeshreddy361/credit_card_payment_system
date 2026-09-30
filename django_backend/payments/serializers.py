from rest_framework import serializers
from .models import Transaction
from cards.models import Card


class TransactionSerializer(serializers.ModelSerializer):

    card = serializers.PrimaryKeyRelatedField(
        queryset=Card.objects.all()
    )

    class Meta:
        model = Transaction
        fields = [
            "id",
            "card",
            "amount",
            "status",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "status",
            "created_at",
        ]

    def validate_card(self, card):

        request = self.context.get("request")

        if request and card.user != request.user:
            raise serializers.ValidationError(
                "You can only make payments using your own card."
            )

        return card

    def create(self, validated_data):

        request = self.context.get("request")

        transaction = Transaction.objects.create(
            user=request.user,
            card=validated_data["card"],
            amount=validated_data["amount"],
            status="PENDING"
        )

        return transaction