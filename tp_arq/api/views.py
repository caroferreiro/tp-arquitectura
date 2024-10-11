from django.shortcuts import render
from rest_framework import generics, status
from .serializers import PDISerializer, EventoSerializer, EstablecimientoSerializer, CreateEventoSerializer, CreateEstablecimientoSerializer, UpdatePDISerializer
from .models import PDI, Evento, Establecimiento
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from .gestor import GestorPDI

gestor_puntos = GestorPDI()

class PDIiew(generics.ListAPIView):
    queryset = gestor_puntos.listarPDIs()
    serializer_class = PDISerializer

class AgregarEvento(APIView):
    serializer_class = CreateEventoSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            nuevo_evento = gestor_puntos.agregar_evento(
                nombre=serializer.data.get('nombre'),
                ciudad=serializer.data.get('ciudad'),
                direccion=serializer.data.get('direccion'),
                categoria=serializer.data.get('categoria'),
                descripcion=serializer.data.get('descripcion'),
                latitud=serializer.data.get('latitud'),
                longitud=serializer.data.get('longitud'),
                dia=serializer.data.get('dia'),
                mes=serializer.data.get('mes'),
                ano=serializer.data.get('ano'),
                horaInicio=serializer.data.get('horaInicio'),
                minutoInicio=serializer.data.get('minutoInicio'),
                duracion=serializer.data.get('duracion'),
            )
            return Response(EventoSerializer(nuevo_evento).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
class AgregarEstablecimiento(APIView):
    serializer_class = CreateEstablecimientoSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            nuevo_establecimiento = gestor_puntos.agregar_establecimiento(
                nombre=serializer.data.get('nombre'),
                ciudad=serializer.data.get('ciudad'),
                direccion=serializer.data.get('direccion'),
                categoria=serializer.data.get('categoria'),
                descripcion=serializer.data.get('descripcion'),
                latitud=serializer.data.get('latitud'),
                longitud=serializer.data.get('longitud'),
            )
            return Response(EstablecimientoSerializer(nuevo_establecimiento).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class AceptarPDI(APIView):
    serializer_class = UpdatePDISerializer

    def patch(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

def eliminarPDI(request, id_punto):
    exito = gestor_puntos.eliminar_punto_de_interes(id_punto)
    if exito:
        return JsonResponse({'mensaje': 'Punto de interés eliminado con éxito'})
    else:
        return JsonResponse({'mensaje': 'Punto de interés no encontrado'}, status=404)