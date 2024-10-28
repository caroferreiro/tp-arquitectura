import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import AdminMarkers from "./AdminMarkers";
import BotonListarPDIs from "./BotonListarPDIs";
import BotonLogOut from "./BotonLogOut";

const MapViewAdmin = () => {
    return (
        <div>
            <BotonLogOut />
            <MapContainer 
                center={[ -38.95231561788808, -68.05600596781214]} 
                zoom={7} 
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
