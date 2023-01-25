import django_on_heroku
from decouple import config

from .base import *

SECRET_KEY = config("SECRET_KEY")
SECRET_KEY_FALLBACKS = [
    config("OLD_SECRET_KEY"),
]

DEBUG = False

ALLOWED_HOSTS = [
    "kow-meds.herokuapp.com"
]

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

django_on_heroku.settings(locals(), staticfiles=False)
# del DATABASES["default"]["OPTIONS"]["sslmode"]