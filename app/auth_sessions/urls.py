from django.urls import path

from .views import GetCSRFToken, LoginView, LogoutView, CheckAuthenticatedView

urlpatterns = [
    path('authenticated', CheckAuthenticatedView.as_view()),
    path("csrf_cookie", GetCSRFToken.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
]