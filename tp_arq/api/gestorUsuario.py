from django.contrib.auth.hashers import check_password, make_password
from .models import Usuario


class GestorUsuario:

    def agregarUsuario(self, mail, contraseña):
        contraseña_hash = make_password(contraseña)
        nuevo_usuario = Usuario(mail=mail, contraseña=contraseña_hash)
        nuevo_usuario.save()
        return nuevo_usuario
    
    def existeUsuario(self, mail):
        return Usuario.objects.filter(mail=mail).exists()
    
    def obtenerUsuario(self, mail):
        try:
            return Usuario.objects.get(mail=mail)
        except Usuario.DoesNotExist:
            return None

    def verificarContraseña(self, usuario, contraseña):
        return check_password(contraseña, usuario.contraseña)