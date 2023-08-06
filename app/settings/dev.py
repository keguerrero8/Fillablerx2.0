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
}
# list of origins authorized to make requests
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4000", "http://localhost:3000"
]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:4000", "http://localhost:3000"
]

CSP_DEFAULT_SRC = ("'self'", "https://ka-f.fontawesome.com")
CSP_STYLE_SRC = (
    "'self' 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=' 'sha256-1USISlZHMKIugh3Afkf42rsUPMDNTrz+VQ+vgROIdc0=' 'sha256-QldBzDWCS1s7GNQTX772r8owZi0jY4NmrxUffnS6JXU=' 'sha256-2cZ8m38uNSMLsCtq662KggyGFBU9Mja+M0iDROJtiQk=' 'sha256-pwbX6hMerGydF6hpVCrlNeCgzBurUXhzzwReOU9TlTc='",
    "https://fonts.googleapis.com",
)
CSP_IMG_SRC = "'self'"
CSP_FONT_SRC = (
    "'self'",
    "https://ka-f.fontawesome.com",
    "https://fonts.gstatic.com",
)
CSP_SCRIPT_SRC = (
    "'self' 'sha256-73pump7BRbfYY3/MrdxBHaS7GeN2lbwI/4AQL3s7ESU='",
    "https://kit.fontawesome.com",
)
