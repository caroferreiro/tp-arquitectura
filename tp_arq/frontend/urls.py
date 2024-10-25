from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('mapa-usuario', index),
    path('mapa-admin', index),
    path('validar-administrador', index),
    path('agregarPDI', index),
    path('agregarEvento', index),
    path('agregarEstablecimiento', index),
    path('revision', index),
    path('listar-pendientes', index),
    path('seleccionar-punto', index),
    path('pdi/<str:id>', index)
]