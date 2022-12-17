from django.urls import path
from . import views


urlpatterns = [
    path('handle/', views.handle_commands),
    path('1/info/', views.get_level_info),
]