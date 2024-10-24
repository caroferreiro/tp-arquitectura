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

        nombre = request.data.get('nombre')
        fechaHora = request.data.get('fechaHora')
        if gestor_puntos.existeEvento(nombre, fechaHora):
            return Response({'message': 'El evento ya existe.'}, status=status.HTTP_409_CONFLICT)
        
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
        
        nombre = request.data.get('nombre')
        if gestor_puntos.existeEstablecimiento(nombre):
            return Response({'message': 'El establecimiento ya existe.'}, status=status.HTTP_409_CONFLICT)
        
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
        print("Errores de validación:", serializer.errors)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class AceptarPDI(APIView):
    serializer_class = UpdatePDISerializer

    def patch(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            id = serializer.data.get('id')

            try:
                pdi = gestor_puntos.aceptar_PDI(id_punto=id)
                if not pdi:
                    return Response({'Bad Request': "PDI not found..."}, status=status.HTTP_404_NOT_FOUND)
                return Response({'Message': 'PDI accepted successfully.'}, status=status.HTTP_200_OK)
            
            except Exception as e:
                return Response({'Error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'Bad Request': "PDI not found..."}, status=status.HTTP_400_BAD_REQUEST)

class RechazarPDI(APIView):
    serializer_class = UpdatePDISerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            id = serializer.data.get('id')
            if gestor_puntos.eliminar_PDI(id_punto=id):
                return Response({'Message': 'Success'}, status=status.HTTP_200_OK)
        
        return Response({'Bad Request': "PDI not found..."}, status=status.HTTP_400_BAD_REQUEST)

class TraerPDIs(APIView):
    serializer_class = PDISerializer

    def get(self, request, format=None):
        estado = request.query_params.get('estado')
        pdilist = gestor_puntos.listarPDIs(estado=estado)

        serializer = self.serializer_class(pdilist, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
class BuscarPDI(APIView):
    serializer_class = PDISerializer

    def get(self, request, format=None):
        id = request.query_params.get('id')
        pdi = gestor_puntos.buscar_PDI(id=id)

        serializer = self.serializer_class(pdi, many=False)

        return Response(serializer.data, status=status.HTTP_200_OK)