import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Importa Leaflet directamente
import "leaflet/dist/leaflet.css"; // Importa el CSS de Leaflet
import blueMarker from "./icons/blue_marker.png"; 

// Configurar el icono personalizado a nivel global para evitar problemas con el cargado de imágenes
delete L.Icon.Default.prototype._getIconUrl;

// Definir el ícono personalizado para los marcadores
const customIcon = new L.Icon({
    iconUrl: blueMarker, 
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [50, 50],
    iconAnchor: [12, 41],
    popupAnchor: [12, -34],
    shadowSize: [80, 50],
});

const UserMarkers = () => {
  const [PDIs, setPDIs] = useState([]);

  useEffect(() => {
    const obtenerPDIs = async () => {
      try {
        const response = await fetch("/api/traer-pdis?estado=True");
        const data = await response.json();
        setPDIs(data);
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
        <Marker key={PDI.id} position={[PDI.latitud, PDI.longitud]} icon={customIcon}>
          <Popup>
            <strong>{PDI.nombre}</strong>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default UserMarkers;
