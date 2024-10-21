import React, { useState } from "react";
import { Grid2 as Grid, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function AgregarEventoPage() {
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [fechaHora, setFechaHora] = useState("");
  const [duracion, setDuracion] = useState("00:00");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Inicializa useNavigate

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const solicitarEventoButton = () => {
    // Parsear la fecha y hora
    const [date, time] = fechaHora.split("T");
    const [year, month, day] = date.split("-");
    const [hours, minutes] = time.split(":");

    // Parsear la duración (hh:mm)
    const [duracionHoras, duracionMinutos] = duracion.split(":");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        ciudad,
        direccion,
        categoria,
        descripcion,
        latitud,
        longitud,
        fechaHora: `${year}-${month}-${day}T${hours}:${minutes}:00`,  // Formato ISO para fecha y hora
        duracion: `PT${duracionHoras}H${duracionMinutos}M`,  // Formato ISO 8601 para la duración
      }),
    };

    console.log("Datos a enviar:", requestOptions); // Imprime los datos

    fetch("/api/agregar-establecimiento", requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log("Evento agregado con éxito");
          navigate("/revision");
        } else if (response.status === 409) {
          setError("El evento ya existe.");
        } else {
          console.log(`Error: ${response.status} - ${response.statusText}`);
          return response.json().then((data) => {
            console.log("Detalles del error:", data);
            setError("Ocurrió un error al agregar el evento.");
          });
        }
      })
      .catch((error) => {
        console.log("Error de red o de servidor:", error);
        setError("Error de red o servidor. Inténtalo nuevamente.");
      });
  };

  return (
    <Grid container spacing={1} direction="column" justifyContent="center">
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Agregar nuevo evento
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          name="nombre"
          label="Nombre"
          placeholder="Ingresa el nombre del evento"
          value={nombre}
          variant="outlined"
          onChange={(e) => setNombre(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          name="ciudad"
          label="Ciudad"
          placeholder="Ingresa la ciudad del evento"
          value={ciudad}
          variant="outlined"
          onChange={(e) => setCiudad(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          name="direccion"
          label="Dirección"
          placeholder="Ingresa la dirección del evento"
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
          placeholder="Ingresa una descripción del evento"
          value={descripcion}
          variant="outlined"
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          name="latitud"
          label="Latitud"
          type="number"
          placeholder="Ingresa la latitud del evento con decimales"
          value={latitud}
          variant="outlined"
          onChange={(e) => setLatitud(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          name="longitud"
          label="Longitud"
          type="number"
          placeholder="Ingresa la longitud del evento con decimales"
          value={longitud}
          variant="outlined"
          onChange={(e) => setLongitud(e.target.value)}
        />
      </Grid>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={4}>
          <TextField
            name="fechaHora"
            label="Fecha y Hora de Inicio"
            type="datetime-local"
            value={fechaHora}
            variant="outlined"
            onChange={(e) => setFechaHora(e.target.value)}  // Guardar fecha y hora en un solo campo
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          name="duracion"
          label="Duración"
          placeholder="hh:mm"
          type="time"
          value={duracion}
          variant="outlined"
          onChange={(e) => setDuracion(e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
              input: { step: 300 },
            },
          }}
        />
      </Grid>
      <Grid item xs={12} align="center">
        {error && <Typography color="error">{error}</Typography>}
      </Grid>
      <Grid item spacing={1} xs={12} align="center">
        <Button variant="contained" color="primary" onClick={solicitarEventoButton}>
          Solicitar nuevo evento
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="outlined" color="secondary" to="/agregarPDI" component={Link}>
          Atrás
        </Button>
      </Grid>
    </Grid>
  );
}