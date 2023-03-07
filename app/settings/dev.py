from .base import *

SECRET_KEY = "abc"

DEBUG = True

ALLOWED_HOSTS = ["localhost"]

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
    ],
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:4000",
]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:4000",
]
