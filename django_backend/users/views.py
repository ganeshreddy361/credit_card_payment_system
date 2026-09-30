from datetime import datetime

from django.contrib.auth import get_user_model
from django.db.models import Sum
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication

from cards.models import Card
from payments.models import Transaction


User = get_user_model()


# =========================================================
# 1. MANAGE USERS
# =========================================================

class AdminUsersView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):

        users = User.objects.all().order_by("-date_joined")

        data = []

        for user in users:
            data.append({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": getattr(user, "first_name", ""),
                "last_name": getattr(user, "last_name", ""),
                "is_active": user.is_active,
                "is_staff": user.is_staff,
                "date_joined": user.date_joined,
            })

        return Response(data)

    def delete(self, request):

        user_id = request.data.get("user_id")

        if not user_id:
            return Response(
                {"error": "user_id is required."},
                status=400
            )

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found."},
                status=404
            )

        if user.id == request.user.id:
            return Response(
                {"error": "You cannot delete your own admin account."},
                status=400
            )

        user.delete()

        return Response({
            "message": "User deleted successfully."
        })


# =========================================================
# 2. VIEW CARDS
# =========================================================

class AdminCardsView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):

        cards = Card.objects.select_related(
            "user"
        ).order_by("-created_at")

        data = []

        for card in cards:

            data.append({
                "id": card.id,
                "user_id": card.user.id,
                "username": card.user.username,
                "masked_card_number": card.masked_card_number,
                "last_four": card.last_four,
                "card_type": card.card_type,
                "expiry_month": card.expiry_month,
                "expiry_year": card.expiry_year,
                "created_at": card.created_at,
            })

        return Response(data)


# =========================================================
# 3. VIEW ALL TRANSACTIONS
# =========================================================

class AdminTransactionsView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):

        transactions = Transaction.objects.select_related(
            "user",
            "card"
        ).order_by("-created_at")

        data = []

        for transaction in transactions:

            data.append({
                "id": transaction.id,
                "user_id": transaction.user.id,
                "username": transaction.user.username,
                "card_id": transaction.card.id,
                "card_number": transaction.card.masked_card_number,
                "amount": str(transaction.amount),
                "status": transaction.status,
                "created_at": transaction.created_at,
            })

        return Response(data)


# =========================================================
# 4. DAILY PAYMENT SUMMARY
# =========================================================

class DailyPaymentSummaryView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):

        date_string = request.query_params.get("date")

        if date_string:

            try:
                selected_date = datetime.strptime(
                    date_string,
                    "%Y-%m-%d"
                ).date()

            except ValueError:

                return Response(
                    {
                        "error": "Invalid date format. Use YYYY-MM-DD."
                    },
                    status=400
                )

        else:
            selected_date = timezone.localdate()

        transactions = Transaction.objects.filter(
            created_at__date=selected_date
        )

        total_transactions = transactions.count()

        successful_transactions = transactions.filter(
            status="SUCCESS"
        ).count()

        failed_transactions = transactions.filter(
            status="FAILED"
        ).count()

        pending_transactions = transactions.filter(
            status="PENDING"
        ).count()

        total_amount = transactions.aggregate(
            total=Sum("amount")
        )["total"] or 0

        successful_amount = transactions.filter(
            status="SUCCESS"
        ).aggregate(
            total=Sum("amount")
        )["total"] or 0

        return Response({
            "date": str(selected_date),
            "total_transactions": total_transactions,
            "successful_transactions": successful_transactions,
            "failed_transactions": failed_transactions,
            "pending_transactions": pending_transactions,
            "total_amount": str(total_amount),
            "successful_amount": str(successful_amount),
        })
