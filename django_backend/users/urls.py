from django.urls import path

from .views import (
    AdminUsersView,
    AdminCardsView,
    AdminTransactionsView,
    DailyPaymentSummaryView,
)

urlpatterns = [
    path("users/", AdminUsersView.as_view(), name="admin-users"),
    path("cards/", AdminCardsView.as_view(), name="admin-cards"),
    path("transactions/", AdminTransactionsView.as_view(), name="admin-transactions"),
    path("daily-summary/", DailyPaymentSummaryView.as_view(), name="daily-payment-summary"),
]