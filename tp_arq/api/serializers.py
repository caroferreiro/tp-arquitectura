from rest_framework import serializers
from .models import Administrador, PDI, Evento, Establecimiento


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrador
        fields = ('mail',)

class PDISerializer(serializers.ModelSerializer):
    class Meta:
        model = PDI
        fields = ('id', 'nombre', 'ciudad', 'direccion', 'categoria',
                  'descripcion', 'latitud', 'longitud', 'estado')

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

class CreateEstablecimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establecimiento
        fields = ('nombre', 'ciudad', 'direccion', 'categoria', 'descripcion', 'latitud', 'longitud')

class UpdatePDISerializer(serializers.ModelSerializer):
    id = serializers.CharField(validators=[])

    class Meta:
        model = PDI
        fields = ('id',)