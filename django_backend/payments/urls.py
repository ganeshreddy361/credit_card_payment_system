from django.urls import path
from .views import TransactionHistoryView, ExportTransactionsView

urlpatterns = [
    path("", TransactionHistoryView.as_view(), name="payments"),
    path("export/", ExportTransactionsView.as_view(), name="export-transactions"),
]