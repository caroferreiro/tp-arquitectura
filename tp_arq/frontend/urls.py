from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('ingresar', index),
    path('validar-administrador', index),
    path('agregarPDI', index),
    path('agregarEvento', index),
    path('agregarEstablecimiento', index),
    path('revision', index),
    path('mapa', index),
    # path('create', index),
    # path('room/<str:roomCode>', index)
]