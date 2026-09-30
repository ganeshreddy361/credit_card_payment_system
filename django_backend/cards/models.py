from django.db import models
from django.conf import settings


class Card(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="cards"
    )

    masked_card_number = models.CharField(
        max_length=19
    )

    last_four = models.CharField(
        max_length=4
    )

    card_type = models.CharField(
        max_length=20
    )

    expiry_month = models.PositiveIntegerField()

    expiry_year = models.PositiveIntegerField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.card_type} ****{self.last_four}"