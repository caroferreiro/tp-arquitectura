import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import gastronomia from "./icons/gastronomia.png"; 
import cultura from "./icons/cultura.png"; 
import musica from "./icons/musica.png"; 
import arte from "./icons/arte.png"; 
import naturaleza from "./icons/naturaleza.png"; 
import cine from "./icons/cine.png"; 
import deporte from "./icons/deporte.png"; 
import blue_marker from "./icons/blue_marker.png"; 

delete L.Icon.Default.prototype._getIconUrl;

const gastronomiaIcon = new L.Icon({
    iconUrl: gastronomia, 
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [50, 50],
    iconAnchor: [12, 41],
    popupAnchor: [12, -34],
    shadowSize: [80, 50],
});

const culturaIcon = new L.Icon({
  iconUrl: cultura, 
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [12, -34],
  shadowSize: [80, 50],
});

const naturalezaIcon = new L.Icon({
  iconUrl: naturaleza, 
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [12, -34],
  shadowSize: [80, 50],
});

const musicaIcon = new L.Icon({
  iconUrl: musica, 
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [12, -34],
  shadowSize: [80, 50],
});

const arteIcon = new L.Icon({
  iconUrl: arte, 
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [12, -34],
  shadowSize: [80, 50],
});

const deporteIcon = new L.Icon({
  iconUrl: deporte, 
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [12, -34],
  shadowSize: [80, 50],
});

const cineIcon = new L.Icon({
  iconUrl: cine, 
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [12, -34],
  shadowSize: [80, 50],
});

const UserMarkers = ({ categoriaSeleccionada }) => {
  const [PDIs, setPDIs] = useState([]);

  useEffect(() => {
    const obtenerPDIs = async () => {
      try {
        const response = await fetch("/api/traer-pdis?estado=True");
        const data = await response.json();

        // Filtrar PDIs según la categoría seleccionada
        const pdisFiltrados = categoriaSeleccionada 
          ? data.filter(PDI => PDI.categoria === categoriaSeleccionada) 
          : data; // Si no hay categoría seleccionada, mostrar todos
        
        setPDIs(pdisFiltrados);
      } catch (error) {
        console.error("Error al obtener los PDIs:", error);
      }
    };

    obtenerPDIs();
  }, [categoriaSeleccionada]);

  const obtenerIconoPorCategoria = (categoria) => {
    switch (categoria) {
      case "Gastronomía":
        return gastronomiaIcon;
      case "Cultura":
        return culturaIcon;
      case "Naturaleza":
        return naturalezaIcon;
      case "Música":
        return musicaIcon;
      case "Arte":
        return arteIcon;
      case "Deporte":
        return deporteIcon;
      case "Cine":
        return cineIcon;
      default:
        return blue_marker;
    }
  };

  return (
    <>
      {PDIs.map((PDI) => (
          <Marker 
          key={PDI.id} 
          position={[PDI.latitud, PDI.longitud]} 
          icon={obtenerIconoPorCategoria(PDI.categoria)}
          >
          <Popup>
            <strong style={{ fontFamily: 'Poppins', fontWeight: 600, align: 'center' }}>{PDI.nombre}</strong>
            <br />
            <br />
            <div style={{ textAlign: 'center' }}>
              <Link 
                to={`/pdi/${PDI.id}`} 
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  textDecoration: 'underline',
                  color: 'primary',
                }}>
                Ver info
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default UserMarkers;