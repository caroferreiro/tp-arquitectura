from django.urls import path
from .views import PDIView, AgregarEvento, AgregarEstablecimiento, AceptarPDI

urlpatterns = [
    path('pdi', PDIView.as_view()),
    path('agregar-evento', AgregarEvento.as_view()),
    path('agregar-establecimiento', AgregarEstablecimiento.as_view()),
    path('aceptar-pdi', AceptarPDI.as_view())
]
