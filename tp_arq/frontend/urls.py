from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('agregarPDI', index),
    # path('create', index),
    # path('room/<str:roomCode>', index)
]