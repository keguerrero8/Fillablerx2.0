import django_on_heroku
from decouple import config

from .base import *

SECRET_KEY = config("SECRET_KEY")
SECRET_KEY_FALLBACKS = [
    config("OLD_SECRET_KEY"),
]

DEBUG = False

ALLOWED_HOSTS = [
    "fillablerx.com"
]