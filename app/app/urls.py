from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path("api-auth", include("rest_framework.urls")),
    path("admin-dash/", admin.site.urls),
    path("api/", include("api.urls")),
    path("auth-sessions/", include("auth_sessions.urls")),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name="index.html"))]