from django.shortcuts import render
from rest_framework import generics, status
from .serializers import AdminSerializer, PDISerializer, EventoSerializer, EstablecimientoSerializer, CreateEventoSerializer, CreateEstablecimientoSerializer, UpdatePDISerializer
from .models import PDI, Administrador
from rest_framework.views import APIView
from rest_framework.response import Response
from .gestorPDI import GestorPDI
from .gestorAdmin import GestorAdmin

gestor_puntos = GestorPDI()
gestor_admin = GestorAdmin()

class AgregarAdmin(APIView):
    serializer_class = AdminSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        # Verificamos si el correo ya existe
        mail = request.data.get('mail')
        if gestor_admin.existeAdmin(mail):
            # Si el administrador ya existe, retorna una respuesta exitosa
            return Response({'message': 'Admin ya existe, acceso concedido.'}, status=status.HTTP_200_OK)

        # Solo validamos el serializer si el admin no existe
        if serializer.is_valid():
            # Si el administrador no existe, crea uno nuevo
            nuevo_admin = gestor_admin.agregarAdmin(mail=mail)
            return Response(AdminSerializer(nuevo_admin).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class PDIView(generics.ListAPIView):
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
            nuevo_evento = serializer.save()
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
        if serializer.is_valid():
            id = serializer.data.get('id')
            usuario = serializer.data.get('usuario')
            estado = serializer.data.get('estado')

            queryset = PDI.objects.filter(id=id)
            if not queryset.exists():
                return Response({'msg': 'Punto de interés no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

            pdi = queryset.first()

            pdi.estado = estado
            pdi.save(update_fields=['estado'])
            return Response(PDISerializer(pdi).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)

# def eliminarPDI(request, id_punto):
#     exito = gestor_puntos.eliminar_punto_de_interes(id_punto)
#     if exito:
#         return JsonResponse({'mensaje': 'Punto de interés eliminado con éxito'})
#     else:
#         return JsonResponse({'mensaje': 'Punto de interés no encontrado'}, status=404)