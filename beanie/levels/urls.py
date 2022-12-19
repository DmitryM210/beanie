from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('level/<int:level_id>/', views.index),
    path('level/<int:level_id>/handle/', views.handle_commands),
    path('level/<int:level_id>/info/', views.get_level_info),
]