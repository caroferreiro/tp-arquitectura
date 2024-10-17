import React, { useState } from "react";
import { Grid2 as Grid, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function AgregarEstablecimientoPage() {
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  
  const navigate = useNavigate(); // Hook useNavigate para la navegación

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const solicitarEstablecimientoButton = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        ciudad,
        direccion,
        categoria,
        descripcion,
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud),
      }),
    };
    console.log("Datos a enviar:", requestOptions); // Imprime los datos

    fetch("/api/agregar-establecimiento", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/revision`); // Usar useNavigate para la navegación
        } else {
          // Muestra el código de error y el mensaje
          console.log(`Error: ${response.status} - ${response.statusText}`);
          return response.json().then((data) => {
            console.log("Detalles del error:", data);
          });
        }
      })
      .catch((error) => {
        console.log("Error de red o de servidor:", error);
      });
  };

  return (
    <Grid container spacing={1} direction="column" justifyContent="center">
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Agregar nuevo establecimiento
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          name="nombre"
          label="Nombre"
          placeholder="Ingresa el nombre del establecimiento"
          value={nombre}
          variant="outlined"
          onChange={(e) => setNombre(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          name="ciudad"
          label="Ciudad"
          placeholder="Ingresa la ciudad del establecimiento"
          value={ciudad}
          variant="outlined"
          onChange={(e) => setCiudad(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          name="direccion"
          label="Dirección"
          placeholder="Ingresa la dirección del establecimiento"
          value={direccion}
          variant="outlined"
          onChange={(e) => setDireccion(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl fullWidth variant="outlined">
          <InputLabel id="categoria-label">Categoría</InputLabel>
          <Select
            labelId="categoria-label"
            value={categoria}
            onChange={handleCategoriaChange}
            label="Categoría"
          >
            <MenuItem value="G">Gastronomía</MenuItem>
            <MenuItem value="E">Entretenimiento</MenuItem>
            <MenuItem value="AL">Aire libre</MenuItem>
            <MenuItem value="M">Música</MenuItem>
            <MenuItem value="C">Cine</MenuItem>
            <MenuItem value="A">Artesanías</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          name="descripcion"
          label="Descripción"
          placeholder="Ingresa una descripción del establecimiento"
          value={descripcion}
          variant="outlined"
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          name="latitud"
          label="Latitud"
          placeholder="Ingresa la latitud del establecimiento con decimales"
          type="number"
          value={latitud}
          variant="outlined"
          onChange={(e) => setLatitud(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          name="longitud"
          label="Longitud"
          placeholder="Ingresa la longitud del establecimiento con decimales"
          type="number"
          value={longitud}
          variant="outlined"
          onChange={(e) => setLongitud(e.target.value)}
        />
      </Grid>
      <Grid item spacing={1} xs={12} align="center">
        <Button variant="contained" color="primary" onClick={solicitarEstablecimientoButton}>
          Solicitar nuevo establecimiento
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/agregarPDI" component={Link}>
          Atrás
        </Button>
      </Grid>
    </Grid>
  );
}
