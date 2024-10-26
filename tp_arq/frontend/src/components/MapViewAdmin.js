import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import "leaflet/dist/leaflet.css"; 
import LogoutIcon from "@mui/icons-material/Logout";
import AdminMarkers from "./AdminMarkers";
import BotonListarPDIs from "./BotonListarPDIs";

const MapViewAdmin = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate(`/`);
        console.log("Cerrar sesión");
    };
    return (
        <div>
            <IconButton 
                onClick={handleLogout}
                style={{
                    position: "fixed",
                    top: "30px",
                    right: "20px",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    border: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    zIndex: 1000,
                }}
            >
                <LogoutIcon />
            </IconButton>
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
