from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework import routers


urlpatterns = [
    path("api-auth", include("rest_framework.urls")),
    path("admin-dash", admin.site.urls),
    path("core/", include("api.urls")),
    path("auth-jwt/", include("auth_sessions.urls")),
    path('auth-jwt/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth-jwt/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #currently not using this route, using auth-jwt/user seems to do the same thing
    # path('auth-jwt/token/verify/', TokenVerifyView.as_view(), name='token_verify'), 
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('schema/docs/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

# urlpatterns += [re_path(r"^.*", TemplateView.as_view(template_name="index.html"))]
urlpatterns += [re_path(r"^.*", SpectacularSwaggerView.as_view(url_name='schema'))]
