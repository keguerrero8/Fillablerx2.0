from django.urls import path

from .views import LoadUserView

urlpatterns = [
    path("user", LoadUserView.as_view()),
]
