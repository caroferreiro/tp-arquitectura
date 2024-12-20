from rest_framework import serializers
from .models import Usuario, Administrador, PDI, Evento, Establecimiento, Imagen


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('mail', 'contraseña')

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrador
        fields = ('mail',)

class ImagenSerializer(serializers.ModelSerializer):

    imagen_url = serializers.SerializerMethodField()

    class Meta:
        model = Imagen
        fields = ('id', 'imagen', 'imagen_url')
    
    def get_imagen_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.imagen.url) if request else obj.imagen.url

class PDISerializer(serializers.ModelSerializer):
    imagenes = ImagenSerializer(many=True, read_only=True)

    class Meta:
        model = PDI
        fields = ('id', 'nombre', 'ciudad', 'direccion', 'categoria',
                  'descripcion', 'latitud', 'longitud', 'estado', 'imagenes')


class EventoSerializer(serializers.ModelSerializer):
    imagenes = ImagenSerializer(many=True, read_only=True)

    class Meta:
        model = Evento
        fields = ('id', 'nombre', 'ciudad', 'direccion', 'categoria', 
                  'descripcion', 'latitud', 'longitud', 'estado', 'fecha', 'horaInicio', 'horaFin', 'imagenes')

class EstablecimientoSerializer(serializers.ModelSerializer):
    imagenes = ImagenSerializer(many=True, read_only=True)

    class Meta:
        model = Establecimiento
        fields = ('id', 'nombre', 'ciudad', 'direccion', 'categoria',
                  'descripcion', 'latitud', 'longitud', 'estado', 'imagenes')

class CreateEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ('nombre', 'ciudad', 'direccion', 'categoria', 'descripcion',
                  'latitud', 'longitud', 'fecha', 'horaInicio', 'horaFin')
    
    def validate(self, data):
        if data['horaInicio'] >= data['horaFin']:
            raise serializers.ValidationError("La hora de inicio debe ser antes de la hora de fin.")
        return data

class CreateEstablecimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establecimiento
        fields = ('nombre', 'ciudad', 'direccion', 'categoria', 'descripcion', 'latitud', 'longitud')

class UpdatePDISerializer(serializers.ModelSerializer):
    id = serializers.CharField(validators=[])

    class Meta:
        model = PDI
        fields = ('id',)