import React, { useState } from "react";
import { Grid2 as Grid, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SeleccionarPunto from "./SeleccionarPunto";

export default function AgregarEstablecimientoPage() {
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [imagenesPreview, setImagenesPreview] = useState([]);
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleImagenesChange = (event) => {
    const files = event.target.files;
    const newImagenes = Array.from(files);
    
    setImagenes(prev => [...prev, ...newImagenes]);
    setImagenesPreview(prev => [
      ...prev,
      ...newImagenes.map(file => URL.createObjectURL(file))
    ]);
  };

  const solicitarEstablecimientoButton = () => {
    
    if (!nombre || !categoria || !descripcion) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (!latitud || !longitud || !direccion) {
      setError("Por favor, selecciona la ubicación del establecimiento en el mapa.");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("ciudad", ciudad);
    formData.append("direccion", direccion);
    formData.append("categoria", categoria);
    formData.append("descripcion", descripcion);
    formData.append("latitud", parseFloat(latitud));
    formData.append("longitud", parseFloat(longitud));
    
    Array.from(imagenes).forEach((imagen, index) => {
      formData.append(`imagenes[${index}]`, imagen);
    });

    fetch("/api/agregar-establecimiento", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          navigate(`/revision`);
        } else if (response.status === 409) {
          setError("El establecimiento ya existe.");
        } else {
          setError("Ocurrió un error al agregar el establecimiento.");
        }
      })
      .catch((error) => {
        setError("Intentalo nuevamente.");
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: "auto",
        height: '100%',
        padding: "10px",
        boxSizing: "border-box",
      }}
      >
      <Grid container spacing={1} direction="column" justifyContent="center">
        <Grid item xs={12} align="center">
        <Typography
          variant="h3"
          compact="h3"
          sx={{ marginBottom: 5, fontFamily: 'Poppins', fontWeight: 700 }} 
        >
          Nuevo establecimiento
        </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            name="nombre"
            label="Nombre *"
            placeholder="Ingresa el nombre del establecimiento"
            value={nombre}
            variant="outlined"
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
            sx={{ 
              fontSize: '1rem', 
              fontFamily: 'Poppins',
              '& .MuiInputBase-input': {
                  fontFamily: 'Poppins',
                  fontSize: '1rem',
              },
              '& .MuiInputLabel-root': {
                  fontFamily: 'Poppins',
                  fontSize: '1rem',
              } 
          }}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl fullWidth variant="outlined">
            <InputLabel id="categoria-label" sx={{ fontFamily: 'Poppins', fontSize: '1rem' }}>Categoría *</InputLabel>
            <Select
              labelId="categoria-label"
              value={categoria}
              onChange={handleCategoriaChange}
              label="Categoría *"
            >
              <MenuItem value="Gastronomía" sx={{ fontFamily: 'Poppins', fontSize: '1rem' }}>Gastronomía</MenuItem>
              <MenuItem value="Cultura" sx={{ fontFamily: 'Poppins', fontSize: '1rem' }}>Cultura</MenuItem>
              <MenuItem value="Naturaleza" sx={{ fontFamily: 'Poppins', fontSize: '1rem' }}>Naturaleza</MenuItem>
              <MenuItem value="Arte" sx={{ fontFamily: 'Poppins', fontSize: '1rem' }}>Arte</MenuItem>
              <MenuItem value="Cine" sx={{ fontFamily: 'Poppins', fontSize: '1rem' }}>Cine</MenuItem>
              <MenuItem value="Deporte" sx={{ fontFamily: 'Poppins', fontSize: '1rem' }}>Deporte</MenuItem>
              <MenuItem value="Música" sx={{ fontFamily: 'Poppins', fontSize: '1rem' }}>Música</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            name="descripcion"
            label="Descripción *"
            placeholder="Ingresa una descripción del establecimiento"
            value={descripcion}
            variant="outlined"
            onChange={(e) => setDescripcion(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={{ 
              fontSize: '1rem', 
              fontFamily: 'Poppins',
              '& .MuiInputBase-input': {
                  fontFamily: 'Poppins',
                  fontSize: '1rem',
              },
              '& .MuiInputLabel-root': {
                  fontFamily: 'Poppins',
                  fontSize: '1rem',
              } 
          }}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="outlined" onClick={() => setMostrarMapa(!mostrarMapa)} sx={{fontFamily: 'Poppins', fontWeight: 600}}>
            {mostrarMapa ? "Ocultar Mapa" : "Seleccionar ubicación en el mapa *"}
          </Button>
        </Grid>
        {mostrarMapa && (
          <Grid item xs={12} align="center">
            <SeleccionarPunto
              setLatitud={setLatitud}
              setLongitud={setLongitud}
              setDireccion={setDireccion}
              setCiudad={setCiudad}
              latitud={latitud}
              longitud={longitud}
            />
          </Grid>
        )}
        <Grid item xs={12} align="center">
          <Button variant="outlined" component="label" sx={{fontFamily: 'Poppins', fontWeight: 600}}>
            Cargar Imágenes
            <input
              type="file"
              multiple
              hidden
              onChange={handleImagenesChange}
              accept="image/*"
            />
          </Button>
        </Grid>
        <Grid xs={12} align="center">
          {imagenesPreview.length > 0 && (
            <Grid container spacing={1} align="center">
              {imagenesPreview.map((src, index) => (
                  <img key={index} src={src} alt={`Vista previa ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />
              ))}
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} align="center">
          {error && <Typography color="error" sx={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: 15 }}>{error}</Typography>}
        </Grid>
        <Grid item spacing={1} xs={12} align="center">
          <Button variant="contained" color="primary" onClick={solicitarEstablecimientoButton} sx={{fontFamily: 'Poppins', fontWeight: 400}}>
            Solicitar nuevo establecimiento
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="outlined" color="secondary" to="/agregarPDI" component={Link} sx={{fontFamily: 'Poppins', fontWeight: 400}}>
            Atrás
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
