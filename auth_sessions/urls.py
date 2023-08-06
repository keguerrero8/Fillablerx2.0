from django.urls import path

from .views import CheckAuthenticatedView, LoadUserView, GetCSRFToken

urlpatterns = [
    path("authenticated", CheckAuthenticatedView.as_view()),
    path("csrf_cookie", GetCSRFToken.as_view()),
    # path("login", LoginView.as_view()), #handled in jwt lib
    # path("logout", LogoutView.as_view()),
    path("user", LoadUserView.as_view()),
]
