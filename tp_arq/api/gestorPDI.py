from .models import PDI, Evento, Establecimiento, Imagen

class GestorPDI:
    
    def agregarEvento(self, nombre, ciudad, direccion, categoria, descripcion, latitud, longitud, fecha, horaInicio, horaFin, imagenes=None):
        nuevo_evento = Evento(nombre=nombre, ciudad=ciudad, direccion=direccion, categoria=categoria, descripcion=descripcion, latitud=latitud, 
                              longitud=longitud, fecha=fecha, horaInicio=horaInicio, horaFin=horaFin)
        nuevo_evento.save()

        if imagenes:
            for imagen in imagenes:
                Imagen.objects.create(pdi=nuevo_evento, imagen=imagen)
                
        return nuevo_evento
    
    def existeEvento(self, nombre, fecha):
        return Evento.objects.filter(nombre=nombre, fecha=fecha).exists()
    
    def agregarEstablecimiento(self, nombre, ciudad, direccion, categoria, descripcion, latitud, longitud, imagenes=None):
        nuevo_establecimiento = Establecimiento(nombre=nombre, ciudad=ciudad, direccion=direccion, categoria=categoria, descripcion=descripcion, latitud=latitud, longitud=longitud)
        nuevo_establecimiento.save()

        if imagenes:
            for imagen in imagenes:
                Imagen.objects.create(pdi=nuevo_establecimiento, imagen=imagen)

        return nuevo_establecimiento
    
    def existeEstablecimiento(self, nombre):
        return Establecimiento.objects.filter(nombre=nombre).exists()
    
    def aceptarPDI(self, id):
        try:
            punto = PDI.objects.get(id=id)
            punto.estado = True
            punto.save(update_fields=['estado'])
            return True
        except PDI.DoesNotExist:
            return False

    def eliminarPDI(self, id):
        try:
            punto = PDI.objects.get(id=id)
            punto.delete()
            return True
        except PDI.DoesNotExist:
            return False

    def listarPDIs(self, estado=None):
        if estado:
            return PDI.objects.filter(estado=estado)
        return PDI.objects.all()
    
    def buscarPDI(self, id):
        return PDI.objects.get(id=id)
        
