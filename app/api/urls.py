from django.urls import path
from api import views

urlpatterns = [
    path('home/',views.home,name="home"),
    path('pharmacies/',views.pharmacies,name="pharmacies"),
    path('pharmacies/<id>/',views.show_pharmacy,name = "show_pharmacy"),
    path('',views.index, name='index')
]
