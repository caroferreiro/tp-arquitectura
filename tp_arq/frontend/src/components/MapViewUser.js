import React, { useEffect, useState } from "react";
import { MenuItem, Select, FormControl, InputLabel, TextField, Button } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import UserMarkers from "./UserMarkers";
import BotonAgregarPDI from "./BotonAgregarPDI";
import BotonLogOut from "./BotonLogOut";
import Buscador from "./Buscador";

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
    const [pdIs, setPdIs] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    // Realizar la búsqueda en la BD al hacer clic en el botón
    const handleBuscar = async () => {
        if (busqueda) {
            const response = await fetch(`/api/buscar-pdi-nombre?nombre=${busqueda}`);
            const data = await response.json();
            setPdIs(data);
        }
    };

    const handleCategoriaChange = (event) => {
        setCategoriaSeleccionada(event.target.value);
    };

    return (
        <div>
            <BotonLogOut />
            <div style={{ position: "absolute", top: 25, left: 60, zIndex: 1000 }}>
            <TextField 
                label="Buscar PDI" 
                variant="outlined" 
                value={busqueda} 
                onChange={(e) => setBusqueda(e.target.value)}
                sx={{  
                    minWidth: 200, 
                    marginRight: '10px', 
                    backgroundColor: 'white', 
                    fontSize: '0.9rem', 
                    fontFamily: 'Poppins',
                    '& .MuiInputBase-input': {
                        fontFamily: 'Poppins',
                        fontSize: '0.9rem',
                    },
                    '& .MuiInputLabel-root': {
                        fontFamily: 'Poppins',
                        fontSize: '0.9rem',
                    }
                }}
            />
                <Button variant="contained" color="secondary" onClick={handleBuscar} sx={{top: 10}}>Buscar</Button>
            </div>
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
                <Buscador pdIs={pdIs} />
                <UserMarkers categoriaSeleccionada={categoriaSeleccionada} />
                <div style={{ position: "absolute", top: 25, left: 1125, zIndex: 1000 }}>
                    <FormControl sx={{ minWidth: 140 }} variant="outlined">
                        <InputLabel 
                            id="categoria-select-label"
                            sx={{ fontFamily: 'Poppins', fontSize: '0.9rem' }}
                            >Categoría
                        </InputLabel>
                        <Select
                            labelId="categoria-select-label"
                            value={categoriaSeleccionada}
                            onChange={handleCategoriaChange}
                            sx={{
                                backgroundColor: 'white',
                                fontSize: '0.9rem',
                                '.MuiSelect-select': {
                                    fontSize: '0.9rem', 
                                    fontFamily: 'Poppins'
                                },
                            }}
                        >
                            <MenuItem value="" sx={{ fontFamily: 'Poppins', fontSize: '0.9rem' }}>
                                <em>Todas</em>
                            </MenuItem>
                            {categorias.map((categoria) => (
                                <MenuItem key={categoria} value={categoria} sx={{ fontFamily: 'Poppins', fontSize: '0.9rem' }}>
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