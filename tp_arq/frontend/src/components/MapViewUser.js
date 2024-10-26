import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import UserMarkers from "./UserMarkers";
import BotonAgregarPDI from "./BotonAgregarPDI";


const MapViewUser = () => {

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