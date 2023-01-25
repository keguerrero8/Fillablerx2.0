import django_on_heroku
from decouple import config

from .base import *

SECRET_KEY = config("SECRET_KEY")
SECRET_KEY_FALLBACKS = [
    config("OLD_SECRET_KEY"),
]

DEBUG = False

ALLOWED_HOSTS = ["kow-meds.herokuapp.com"]

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

django_on_heroku.settings(locals(), staticfiles=False)
# del DATABASES["default"]["OPTIONS"]["sslmode"]

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'simple': {
            'format': '{levelname} [{asctime}] module:{module} - {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
            'stream': sys.stdout,
        },
    },
    'loggers': {  # I tried replacing this with 'root'
        '': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    }
}
