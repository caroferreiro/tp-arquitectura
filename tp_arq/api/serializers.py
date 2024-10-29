from rest_framework import serializers
from .models import Administrador, PDI, Evento, Establecimiento, Imagen


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrador
        fields = ('mail',)

class ImagenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imagen
        fields = ('id', 'imagen')

class PDISerializer(serializers.ModelSerializer):
    imagenes = ImagenSerializer(many=True, read_only=True)

    class Meta:
        model = PDI
        fields = ('id', 'nombre', 'ciudad', 'direccion', 'categoria',
                  'descripcion', 'latitud', 'longitud', 'estado', 'imagenes')

class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ('id', 'nombre', 'ciudad', 'direccion', 'categoria', 
                  'descripcion', 'latitud', 'longitud', 'estado', 'fecha', 'horaInicio', 'horaFin')

class EstablecimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establecimiento
        fields = ('id', 'nombre', 'ciudad', 'direccion', 'categoria',
                  'descripcion', 'latitud', 'longitud', 'estado')

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
    
class CreateImagenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imagen
        fields = ('imagen',)

class UpdatePDISerializer(serializers.ModelSerializer):
    id = serializers.CharField(validators=[])

    class Meta:
        model = PDI
        fields = ('id',)