from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _
from django.db import models
import random
import string

def generate_unique_id():
    length = 8

    while True:
        id = ''.join(random.choices(string.ascii_uppercase, k=length))
        if PDI.objects.filter(id=id).count() == 0:
            break

    return id

# Create your models here.
class Administrador(models.Model):
    mail = models.EmailField(max_length=50, unique=True, default='')

class PDI(models.Model):
    categorias = [
        ('Gastronomía', 'Gastronomía'),
        ('Entretenimiento', 'Entretenimiento'),
        ('Aire libre', 'Aire libre'),
        ('Música', 'Música'),
        ('Cine', 'Cine'),
        ('Artesanías', 'Artesanías')
    ]
    id = models.CharField(max_length=8, default=generate_unique_id, unique=True, primary_key=True)
    nombre = models.CharField(max_length=50, null=False, unique=False)
    ciudad = models.CharField(max_length=50, null=True, blank=True, unique=False)
    direccion = models.CharField(max_length=200, null=False, unique=False)
    categoria = models.CharField(max_length=15, choices=categorias)
    descripcion = models.CharField(max_length=2000, default='')
    latitud = models.FloatField(validators=[MinValueValidator(-90), MaxValueValidator(90)])
    longitud = models.FloatField(validators=[MinValueValidator(-180), MaxValueValidator(180)])
    estado = models.BooleanField(null=False, default=False)

class Evento(PDI):
    fecha = models.DateField(null=False)
    horaInicio = models.TimeField(null=False)
    horaFin = models.TimeField(null=True)

class Establecimiento(PDI):
    pass

class Imagen(models.Model):
    pdi = models.ForeignKey(PDI, related_name='imagenes', on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to='imagenes_pdi/')