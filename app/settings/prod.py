import django_on_heroku
from decouple import config
import sys

from .base import *

SECRET_KEY = config("SECRET_KEY")
SECRET_KEY_FALLBACKS = [
    config("OLD_SECRET_KEY"),
]

DEBUG = False

ALLOWED_HOSTS = ["kow-meds.herokuapp.com", "api.kowmeds.com"]

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

django_on_heroku.settings(locals(), staticfiles=False)

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_RENDERER_CLASSES": ("rest_framework.renderers.JSONRenderer",),
}

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "simple": {
            "format": "{levelname} [{asctime}] module:{module} - {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "simple",
            "stream": sys.stdout,
        },
    },
    "loggers": {  # I tried replacing this with 'root'
        "": {
            "handlers": ["console"],
            "level": "DEBUG",
        },
    },
}

# redirects all non-https traffic to https
SECURE_SSL_REDIRECT = True

SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

#add domain of prod next js app,
CORS_ALLOWED_ORIGINS = [
    'https://kow-ui.vercel.app', 
    'https://kowmeds.com'
]

