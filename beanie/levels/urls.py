from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('level/1/', views.index),
    path('level/handle/', views.handle_commands),
    path('level/1/info/', views.get_level_info),
]