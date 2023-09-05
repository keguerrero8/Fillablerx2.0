from .base import *

SECRET_KEY = "abc"

DEBUG = True

# what are the hosts that can serve your app, this will actually not change, in prod the name of api domain will be needed
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}
# list of origins authorized to make requests
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4000", "http://localhost:3000"
]