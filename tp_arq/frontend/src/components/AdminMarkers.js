import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
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

  return (
    <>
      {PDIs.map((PDI) => (
        <Marker 
          key={PDI.id} 
          position={[PDI.latitud, PDI.longitud]} 
          icon={PDI.estado ? iconAprobado : iconNoAprobado} // Usar ícono según el estado
        >
          <Popup>
            <strong>{PDI.nombre}</strong>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default AdminMarkers;
