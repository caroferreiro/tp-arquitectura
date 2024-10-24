from django.urls import path
from .views import AgregarAdmin, PDIView, AgregarEvento, AgregarEstablecimiento, AceptarPDI, RechazarPDI, TraerPDIs, BuscarPDI

urlpatterns = [
    path('pdi', PDIView.as_view()),
    path('agregar-admin', AgregarAdmin.as_view()),
    path('agregar-evento', AgregarEvento.as_view()),
    path('agregar-establecimiento', AgregarEstablecimiento.as_view()),
    path('aceptar-pdi', AceptarPDI.as_view()),
    path('rechazar-pdi', RechazarPDI.as_view()),
    path('traer-pdis', TraerPDIs.as_view()),
    path('buscar-pdi', BuscarPDI.as_view()),
]
