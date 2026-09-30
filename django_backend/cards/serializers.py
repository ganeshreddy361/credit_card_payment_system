from rest_framework import serializers
from .models import Card


class CardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Card

        fields = [
            "id",
            "user",
            "masked_card_number",
            "last_four",
            "card_type",
            "expiry_month",
            "expiry_year",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "user",
            "masked_card_number",
            "last_four",
            "created_at",
        ]

    def create(self, validated_data):
        card_type = validated_data["card_type"]

        # Generate a simple demo card number
        card_number = "4111111111111111"

        # Mask all but the last four digits
        masked_card_number = "**** **** **** " + card_number[-4:]

        # Store only the last four digits
        last_four = card_number[-4:]

        card = Card.objects.create(
            user=self.context["request"].user,
            masked_card_number=masked_card_number,
            last_four=last_four,
            card_type=card_type,
            expiry_month=validated_data["expiry_month"],
            expiry_year=validated_data["expiry_year"],
        )

        return card
    