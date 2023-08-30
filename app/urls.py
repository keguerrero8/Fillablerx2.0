from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path("api-auth", include("rest_framework.urls")),
    path("admin-dash", admin.site.urls),
    path("core/", include("api.urls")),
    path("auth-jwt/", include("auth_sessions.urls")),
    path('auth-jwt/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth-jwt/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth-jwt/token/verify/', TokenVerifyView.as_view(), name='token_verify'), #currently not using this route, using auth-jwt/user seems to do the same thing
]

# this is a catch all, so that any url outside of the ones above are sent to the
# index.html that lives inside our build folder so react router can take over.
# when migrating fully to next js with frontend, can we remove this catch-all or 
# can we utilize to redirect to some place?
# urlpatterns += [re_path(r"^.*", TemplateView.as_view(template_name="index.html"))]
