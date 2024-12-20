from django.shortcuts import render
from rest_framework import generics, status
from .serializers import AdminSerializer, PDISerializer, EventoSerializer, EstablecimientoSerializer, CreateEventoSerializer, CreateEstablecimientoSerializer, UpdatePDISerializer, UsuarioSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .gestorPDI import GestorPDI
from .gestorAdmin import GestorAdmin
from .gestorUsuario import GestorUsuario
from .models import Evento, Establecimiento

gestor_puntos = GestorPDI()
gestor_admin = GestorAdmin()
gestor_usuario = GestorUsuario()

class AgregarUsuario(APIView):
    serializer_class = UsuarioSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        mail = request.data.get('mail')
        contraseña = request.data.get('contraseña')

        if gestor_usuario.existeUsuario(mail):
            return Response({'message': 'Ya existe un usuario con este mail.'}, status=status.HTTP_403_FORBIDDEN)

        if serializer.is_valid():
            nuevo_usuario = gestor_usuario.agregarUsuario(mail=mail, contraseña=contraseña)
            return Response(UsuarioSerializer(nuevo_usuario).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
class VerificarUsuario(APIView):
    serializer_class = UsuarioSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        mail = request.data.get('mail')
        contraseña = request.data.get('contraseña')
        
        usuario = gestor_usuario.obtenerUsuario(mail)
        # Verificar si el usuario existe
        if not usuario:
            return Response({'message': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        # Verificar la contraseña
        if not gestor_usuario.verificarContraseña(usuario, contraseña):
            return Response({'message': 'Contraseña incorrecta.'}, status=status.HTTP_403_FORBIDDEN)
        
        return Response({'message': 'Usuario verificado correctamente.'}, status=status.HTTP_200_OK)
    
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

class PDISearchView(generics.ListAPIView):
    serializer_class = PDISerializer

    def get_queryset(self):
        nombre = self.request.query_params.get('nombre', None)
        return gestor_puntos.buscarPDINombre(nombre)
        
class AgregarEvento(APIView):
    serializer_class = CreateEventoSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        nombre = request.data.get('nombre')
        fecha = request.data.get('fecha')
        if gestor_puntos.existeEvento(nombre, fecha):
            return Response({'message': 'El evento ya existe.'}, status=status.HTTP_409_CONFLICT)
        
        if serializer.is_valid():
            imagenes = [request.FILES[key] for key in request.FILES if key.startswith('imagenes')]
            nuevo_evento = gestor_puntos.agregarEvento(
                nombre=serializer.data.get('nombre'),
                ciudad=serializer.data.get('ciudad'),
                direccion=serializer.data.get('direccion'),
                categoria=serializer.data.get('categoria'),
                descripcion=serializer.data.get('descripcion'),
                latitud=serializer.data.get('latitud'),
                longitud=serializer.data.get('longitud'),
                fecha=serializer.data.get('fecha'),
                horaInicio=serializer.data.get('horaInicio'),
                horaFin=serializer.data.get('horaFin'),
                imagenes=imagenes
            )
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
            imagenes = [request.FILES[key] for key in request.FILES if key.startswith('imagenes')]
            nuevo_establecimiento = gestor_puntos.agregarEstablecimiento(
                nombre=serializer.data.get('nombre'),
                ciudad=serializer.data.get('ciudad'),
                direccion=serializer.data.get('direccion'),
                categoria=serializer.data.get('categoria'),
                descripcion=serializer.data.get('descripcion'),
                latitud=serializer.data.get('latitud'),
                longitud=serializer.data.get('longitud'),
                imagenes=imagenes
            )
            return Response(EstablecimientoSerializer(nuevo_establecimiento).data, status=status.HTTP_201_CREATED)
       
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class AceptarPDI(APIView):
    serializer_class = UpdatePDISerializer

    def patch(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            id = serializer.data.get('id')

            try:
                pdi = gestor_puntos.aceptarPDI(id=id)
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
            if gestor_puntos.eliminarPDI(id=id):
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

    def get(self, request, format=None):
        id = request.query_params.get('id')
        pdi = gestor_puntos.buscarPDI(id=id)

        if pdi is None:
            return Response({'message': 'PDI no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        if isinstance(pdi, Evento):
            serializer = EventoSerializer(pdi, context={'request': request})
        elif isinstance(pdi, Establecimiento):
            serializer = EstablecimientoSerializer(pdi, context={'request': request})
        else:
            serializer = PDISerializer(pdi, context={'request': request})
        
        return Response(serializer.data, status=status.HTTP_200_OK)