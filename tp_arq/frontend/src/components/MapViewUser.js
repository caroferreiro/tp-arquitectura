import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario
import UserMarkers from "./UserMarkers";
import BotonAgregarPDI from "./BotonAgregarPDI";

const MapViewUser = () => {
    const navigate = useNavigate(); // Hook para redirección

    const handleButtonClick = () => {
        navigate("/agregarPDI"); // Ruta de la página para agregar un PDI
    };

    return (
        <div>
            <MapContainer 
                center={[-38.95231561788808, -68.05600596781214]} 
                zoom={13} 
                scrollWheelZoom={false} 
                className="leaflet-container"
                style={{ height: "100vh", width: "100vw" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <UserMarkers />
            </MapContainer>
            <BotonAgregarPDI />
        </div>
    );
};

export default MapViewUser;