from .models import Administrador


class GestorAdmin:

    def agregarAdmin(self, mail):
        nuevo_admin = Administrador(mail=mail)
        nuevo_admin.save()
        return nuevo_admin
    
    def existeAdmin(self, mail):
        return Administrador.objects.filter(mail=mail).exists()