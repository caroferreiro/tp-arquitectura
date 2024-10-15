from rest_framework import serializers
from .models import PDI, Evento, Establecimiento

class PDISerializer(serializers.ModelSerializer):
    class Meta:
        model = PDI
        fields = ('id', 'nombre', 'ciudad', 'direccion', 'categoria',
                  'descripcion', 'latitud', 'longitud', 'estado')

class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ('id', 'nombre', 'ciudad', 'direccion', 'categoria', 
                  'descripcion', 'latitud', 'longitud', 'estado', 'dia', 
                  'mes', 'ano', 'horaInicio', 'minutoInicio', 'duracion')

class EstablecimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establecimiento
        fields = ('id', 'nombre', 'ciudad', 'direccion', 'categoria',
                  'descripcion', 'latitud', 'longitud', 'estado')

class CreateEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ('nombre', 'ciudad', 'direccion', 'categoria', 'descripcion',
                  'latitud', 'longitud', 'dia', 'mes', 'ano', 'horaInicio', 
                  'minutoInicio', 'duracion')

class CreateEstablecimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establecimiento
        fields = ('nombre', 'ciudad', 'direccion', 'categoria', 'descripcion', 'latitud', 'longitud')

class UpdatePDISerializer(serializers.ModelSerializer):
    id = serializers.CharField(validators=[])

    class Meta:
        model = PDI
        fields = ('id', 'usuario', 'estado')