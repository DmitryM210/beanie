from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('level/1/', views.index)
]