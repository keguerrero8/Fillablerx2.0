from .base import *

SECRET_KEY = "abc"

DEBUG = True

ALLOWED_HOSTS = ["localhost"]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:4000",
]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:4000",
]
