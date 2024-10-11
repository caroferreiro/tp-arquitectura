from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _
from django.db import models
import random
import string


def validate_password_length(value):
    if len(value) > 8:
        raise ValidationError(
            _("La contraseña debe tener al menos 8 caracteres.")
        )

def generate_unique_id():
    length = 8

    while True:
        id = ''.join(random.choices(string.ascii_uppercase, k=length))
        if PDI.objects.filter(id=id).count() == 0:
            break

    return id

# Create your models here.
class Usuario(models.Model):
    nombre = models.CharField(max_length=50, default='', unique=False)
    mail = models.CharField(max_length=50, default='', unique=True)
    contraseña = models.CharField(max_length=20, null=False, validators=[validate_password_length])
    es_admin = models.BooleanField(null=False, default=False)

    def evaluarPDI(self, sugerencia):
        if self.es_admin:
            pass

class PDI(models.Model):
    categorias = [
        ('G', 'Gastronomía'),
        ('E', 'Entretenimiento'),
        ('AL', 'Aire libre'),
        ('M', 'Música'),
        ('C', 'Cine'),
        ('A', 'Artesanías')
    ]
    id = models.CharField(max_length=8, default=generate_unique_id, unique=True)
    nombre = models.CharField(max_length=50, null=False, unique=False)
    ciudad = models.CharField(max_length=50, null=False, unique=False)
    direccion = models.CharField(max_length=50, null=False, unique=False)
    categoria = models.CharField(max_length=15, choices=categorias)
    descripcion = models.CharField(max_length=250, default='')
    latitud = models.FloatField(max_length=15, validators=[MinValueValidator(-90), MaxValueValidator(90)])
    longitud = models.FloatField(max_length=15, validators=[MinValueValidator(-180), MaxValueValidator(180)])
    estado = models.BooleanField(null=False, default=False)

    class Meta:
        abstract = True

class Evento(PDI):
    dia = models.IntegerField(null=False)
    mes = models.IntegerField(null=False)
    ano = models.IntegerField(null=False)
    horaInicio = models.IntegerField(null=False)
    minutoInicio = models.IntegerField(null=False)
    duracion = models.IntegerField(null=False)
    # fecha = models.DateField()
    # horaInicio = models.TimeField()
    # horaFin = models.TimeField()

class Establecimiento(PDI):
    pass
