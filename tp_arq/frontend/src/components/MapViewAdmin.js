import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import AdminMarkers from "./AdminMarkers";
import BotonListarPDIs from "./BotonListarPDIs";

const MapViewAdmin = () => {
    return (
        <div>
            <MapContainer 
                center={[ -38.95231561788808, -68.05600596781214]} 
                zoom={13} 
                scrollWheelZoom={false} 
                className="leaflet-container"
                style={{ height: "100vh", width: "100vw" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <AdminMarkers />
            </MapContainer>
            <BotonListarPDIs />
        </div>
    );
};

export default MapViewAdmin;
