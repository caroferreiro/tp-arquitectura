from .models import PDI, Evento, Establecimiento

class GestorPDI:

    def aceptar_PDI(self, id_punto):
        try:
            punto = PDI.objects.get(id=id_punto)
            punto.estado = True
            return True
        except PDI.DoesNotExist:
            return False
    
    def agregar_evento(self, nombre, ciudad, direccion, categoria, descripcion, latitud, longitud, dia, mes, ano, horaInicio, minutoInicio, duracion):
        nuevo_evento = Evento(nombre=nombre, ciudad=ciudad, direccion=direccion, categoria=categoria, descripcion=descripcion, latitud=latitud, 
                              longitud=longitud, dia=dia, mes=mes, ano=ano, horaInicio=horaInicio, minutoInicio=minutoInicio, duracion=duracion)
        nuevo_evento.save()
        return nuevo_evento
    
    def agregar_establecimiento(self, nombre, ciudad, direccion, categoria, descripcion, latitud, longitud):
        nuevo_establecimiento = Establecimiento(nombre=nombre, ciudad=ciudad, direccion=direccion, categoria=categoria, descripcion=descripcion, latitud=latitud, longitud=longitud)
        nuevo_establecimiento.save()
        return nuevo_establecimiento

    def eliminar_PDI(self, id_punto):
        try:
            punto = PDI.objects.get(id=id_punto)
            punto.delete()
            return True
        except PDI.DoesNotExist:
            return False

    def buscar_PDI(self, nombre):
        return PDI.objects.filter(nombre__icontains=nombre)

    def listarPDIs(self):
        return PDI.objects.all()