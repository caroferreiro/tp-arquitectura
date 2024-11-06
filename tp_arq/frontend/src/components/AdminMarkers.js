import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import redMarker from "./icons/red_marker.png";
import blueMarker from "./icons/blue_marker.png";

// Configurar los íconos personalizados para diferentes estados
delete L.Icon.Default.prototype._getIconUrl;

// Ícono para los PDIs aprobados (estado=True)
const iconAprobado = new L.Icon({
    iconUrl: blueMarker, 
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [50, 50],
    iconAnchor: [12, 41],
    popupAnchor: [12, -34],
    shadowSize: [80, 50],
});

// Ícono para los PDIs no aprobados (estado=False)
const iconNoAprobado = new L.Icon({
    iconUrl: redMarker, 
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [50, 50],
    iconAnchor: [12, 41],
    popupAnchor: [12, -34],
    shadowSize: [80, 50],
});


const AdminMarkers = () => {
  const [PDIs, setPDIs] = useState([]);
  const [openDialog, setOpenDialog] = useState(null); // Controlar diálogo para cada PDI

  useEffect(() => {
    const obtenerPDIs = async () => {
      try {
        const response = await fetch("/api/traer-pdis"); // Obteniendo todos los PDIs, sin importar el estado
        const data = await response.json();
        setPDIs(data); // Guardar los PDIs en el estado
        console.log(data); // Verificar los datos
      } catch (error) {
        console.error("Error al obtener los PDIs:", error);
      }
    };

    obtenerPDIs();
  }, []);

  const handleOpenDialog = (id) => {
    setOpenDialog(id); // Establecer el ID del PDI en el diálogo
  };

  const handleCloseDialog = () => {
    setOpenDialog(null); // Cerrar el diálogo
  };

  const handleEliminarPDI = async (id) => {
    try {
      const response = await fetch("/api/rechazar-pdi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setPDIs(PDIs.filter((pdi) => pdi.id !== id)); // Remover el PDI eliminado del estado
        handleCloseDialog(); // Cerrar el diálogo después de eliminar
      } else {
        console.error("Error al eliminar el PDI:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red o de servidor:", error);
    }
  };

  return (
    <>
      {PDIs.map((PDI) => (
        <Marker 
          key={PDI.id} 
          position={[PDI.latitud, PDI.longitud]} 
          icon={PDI.estado ? iconAprobado : iconNoAprobado} // Usar ícono según el estado
        >
          <Popup>
          <div style={{ textAlign: 'center' }}>
            <strong style={{ fontFamily: 'Poppins', fontWeight: 600 }}>{PDI.nombre}</strong>
            {PDI.estado && (
              <>
                <br /> 
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleOpenDialog(PDI.id)} // Abre el diálogo para el PDI específico
                  style={{
                    fontFamily: 'Poppins',
                    fontWeight: 300,
                    fontSize: 11,
                    marginTop: 8,
                  }}
                >
                  Eliminar
                </Button>
                <Dialog
                  open={openDialog === PDI.id} // Abrir diálogo solo si openDialog es igual al id del PDI
                  onClose={handleCloseDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  maxWidth="xs" // Establece el tamaño máximo del diálogo
                  fullWidth // Asegura que ocupe todo el ancho disponible según el maxWidth
                  sx={{
                    '& .MuiDialog-paper': { width: '400px', maxWidth: '100%' } // Personaliza el ancho específico
                  }}
              >
                  <DialogTitle id="alert-dialog-title" sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20 }}>
                    {"¿Estás seguro que querés eliminar el punto de interés?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary" sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
                      Atrás
                    </Button>
                    <Button onClick={() => handleEliminarPDI(PDI.id)} color="primary" autoFocus sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
                      Confirmar
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}
          </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default AdminMarkers;
