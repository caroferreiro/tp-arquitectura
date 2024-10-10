from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _
from django.db import models


def validate_password_length(value):
    if len(value) > 8:
        raise ValidationError(
            _("La contraseña debe tener al menos 8 caracteres.")
        )

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
    nombre = models.CharField(max_length=50, null=False, unique=False)
    ciudad = models.CharField(max_length=50, null=False, unique=False)
    direccion = models.CharField(max_length=50, null=False, unique=False)
    categoria = models.CharField(max_length=50, default='', unique=False)
    info = models.CharField(max_length=250, default='')
    latitud = models.FloatField(max_length=15, validators=[MinValueValidator(-90), MaxValueValidator(90)])
    longitud = models.FloatField(max_length=15, validators=[MinValueValidator(-180), MaxValueValidator(180)])

class Evento(models.Model):
    pdi = models.ForeignKey(PDI, on_delete=models.CASCADE)
    dia = models.IntegerField(max_length=2, null=False)
    mes = models.IntegerField(max_length=2, null=False)
    ano = models.IntegerField(max_length=4, null=False)
    horaInicio = models.IntegerField(max_length=2, null=False)
    minutoInicio = models.IntegerField(max_length=2, null=False)
    duracion = models.IntegerField(max_length=4, null=False)
    # fecha = models.DateField()
    # horaInicio = models.TimeField()
    # horaFin = models.TimeField()

class Establecimiento(models.Model):
    pdi = models.ForeignKey(PDI, on_delete=models.CASCADE)


class MapaController(models.Model):
    def aplicarFiltros(self, categorías):
        pass

    def disponibilizarPDIs(self):
        pass

class GestorPDI(models.Model):
    def buscarPDI(self, nombre):
        pass

    def agregarPDI(self, PDI):
        pass

    def eliminarPDI(self, PDI):
        pass