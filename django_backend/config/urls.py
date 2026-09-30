from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),

    # Users
    path("api/", include("users.urls")),

    # Cards
    path("api/cards/", include("cards.urls")),

    # Transactions / Payments
    path("api/transactions/", include("payments.urls")),

    # JWT Authentication
    path(
        "api/token/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair"
    ),

    path(
        "api/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),
]