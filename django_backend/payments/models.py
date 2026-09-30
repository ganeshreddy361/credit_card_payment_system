from django.db import models
from django.conf import settings
from cards.models import Card


# =========================================================
# TRANSACTIONS
# =========================================================

class Transaction(models.Model):

    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("SUCCESS", "Success"),
        ("FAILED", "Failed"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="transactions"
    )

    card = models.ForeignKey(
        Card,
        on_delete=models.CASCADE,
        related_name="transactions"
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.user} - {self.amount} - {self.status}"


# =========================================================
# ADMIN LOGS
# =========================================================

class AdminLog(models.Model):

    ACTION_CHOICES = [
        ("USER_VIEW", "User View"),
        ("USER_DELETE", "User Delete"),
        ("CARD_VIEW", "Card View"),
        ("TRANSACTION_VIEW", "Transaction View"),
        ("SUMMARY_VIEW", "Summary View"),
    ]

    admin = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="admin_logs"
    )

    action = models.CharField(
        max_length=50,
        choices=ACTION_CHOICES
    )

    description = models.TextField(
        blank=True
    )

    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.admin} - {self.action}"
