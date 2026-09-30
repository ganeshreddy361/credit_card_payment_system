import csv

from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from .models import Transaction
from .serializers import TransactionSerializer


# ============================================================
# PAYMENT CREATE + LIST
# ============================================================

class PaymentView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        transactions = Transaction.objects.filter(
            user=request.user
        ).order_by("-created_at")

        serializer = TransactionSerializer(
            transactions,
            many=True,
            context={"request": request}
        )

        return Response(serializer.data)

    def post(self, request):

        serializer = TransactionSerializer(
            data=request.data,
            context={"request": request}
        )

        if serializer.is_valid():
            transaction = serializer.save()

            return Response(
                {
                    "id": transaction.id,
                    "card": transaction.card.id,
                    "amount": str(transaction.amount),
                    "status": transaction.status,
                    "created_at": transaction.created_at,
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# ============================================================
# SINGLE TRANSACTION
# ============================================================

class PaymentDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, request, pk):

        try:
            return Transaction.objects.get(
                id=pk,
                user=request.user
            )

        except Transaction.DoesNotExist:
            return None

    def get(self, request, pk):

        transaction = self.get_object(request, pk)

        if not transaction:
            return Response(
                {"detail": "Transaction not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TransactionSerializer(
            transaction,
            context={"request": request}
        )

        return Response(serializer.data)


# ============================================================
# TRANSACTION HISTORY
# ============================================================

class TransactionHistoryView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        transactions = Transaction.objects.filter(
            user=request.user
        ).order_by("-created_at")

        # ----------------------------------------------------
        # FILTER BY STATUS
        # Example:
        # /api/transactions/?status=SUCCESS
        # ----------------------------------------------------

        status_filter = request.query_params.get("status")

        if status_filter:
            transactions = transactions.filter(
                status=status_filter.upper()
            )

        # ----------------------------------------------------
        # FILTER BY MINIMUM AMOUNT
        # Example:
        # /api/transactions/?min_amount=100
        # ----------------------------------------------------

        min_amount = request.query_params.get("min_amount")

        if min_amount:
            transactions = transactions.filter(
                amount__gte=min_amount
            )

        # ----------------------------------------------------
        # FILTER BY MAXIMUM AMOUNT
        # Example:
        # /api/transactions/?max_amount=1000
        # ----------------------------------------------------

        max_amount = request.query_params.get("max_amount")

        if max_amount:
            transactions = transactions.filter(
                amount__lte=max_amount
            )

        # ----------------------------------------------------
        # FILTER BY START DATE
        # Example:
        # /api/transactions/?date_from=2026-09-01
        # ----------------------------------------------------

        date_from = request.query_params.get("date_from")

        if date_from:
            transactions = transactions.filter(
                created_at__date__gte=date_from
            )

        # ----------------------------------------------------
        # FILTER BY END DATE
        # Example:
        # /api/transactions/?date_to=2026-09-30
        # ----------------------------------------------------

        date_to = request.query_params.get("date_to")

        if date_to:
            transactions = transactions.filter(
                created_at__date__lte=date_to
            )

        serializer = TransactionSerializer(
            transactions,
            many=True,
            context={"request": request}
        )

        return Response(serializer.data)


# ============================================================
# ADMIN EXPORT TRANSACTIONS CSV
# ============================================================

class ExportTransactionsView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        transactions = Transaction.objects.all().order_by(
            "-created_at"
        )

        response = HttpResponse(
            content_type="text/csv"
        )

        response["Content-Disposition"] = (
            'attachment; filename="transactions.csv"'
        )

        writer = csv.writer(response)

        writer.writerow([
            "ID",
            "User",
            "Card ID",
            "Amount",
            "Status",
            "Created At"
        ])

        for transaction in transactions:

            writer.writerow([
                transaction.id,
                transaction.user.username,
                transaction.card.id,
                transaction.amount,
                transaction.status,
                transaction.created_at,
            ])

        return response
