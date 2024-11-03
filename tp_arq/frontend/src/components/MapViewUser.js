import React, { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import UserMarkers from "./UserMarkers";
import BotonAgregarPDI from "./BotonAgregarPDI";
import BotonLogOut from "./BotonLogOut";

const categorias = [
    'Gastronomía',
    'Cultura',
    'Naturaleza',
    'Música',
    'Cine',
    'Arte',
    'Deporte'
];

const MapViewUser = () => {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

    const handleCategoriaChange = (event) => {
        setCategoriaSeleccionada(event.target.value);
    };

    return (
        <div>
            <BotonLogOut />
            <MapContainer 
                center={[-38.95231561788808, -68.05600596781214]} 
                zoom={10} 
                scrollWheelZoom={false} 
                className="leaflet-container"
                style={{ height: "100vh", width: "100vw" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <UserMarkers categoriaSeleccionada={categoriaSeleccionada} />
                <div style={{ position: "absolute", top: 10, left: 80, zIndex: 1000 }}>
                    <FormControl sx={{ minWidth: 200 }} variant="outlined">
                        <InputLabel id="categoria-select-label">Categoría</InputLabel>
                        <Select
                            labelId="categoria-select-label"
                            value={categoriaSeleccionada}
                            onChange={handleCategoriaChange}
                            style={{ backgroundColor: 'white', fontSize: '1.2rem' }} // Cambia el fondo y el tamaño de la fuente
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 300,
                                        fontSize: '1rem', // Cambiar el tamaño de la fuente del menú
                                    },
                                },
                            }}
                        >
                            <MenuItem value="">
                                <em>Todas</em>
                            </MenuItem>
                            {categorias.map((categoria) => (
                                <MenuItem key={categoria} value={categoria}>
                                    {categoria}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </MapContainer>
            <BotonAgregarPDI />
        </div>
    );
};

export default MapViewUser;