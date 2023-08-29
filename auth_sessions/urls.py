from django.urls import path

from .views import LoadUserView

urlpatterns = [
    # path("logout", LogoutView.as_view()),
    path("user", LoadUserView.as_view()),
]
