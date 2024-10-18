import React, { useEffect, useState } from "react";
import { Grid2 as Grid, Typography, List, ListItem, ListItemText, Button, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";

export default function ListaPDIsPage() {
  const [pdis, setPdis] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPDIs();
  }, []);

  const fetchPDIs = () => {
    fetch("/api/traer-pdis?estado=false")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setPdis(data);  // Guardamos los PDIs obtenidos
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleAceptar = (id) => {
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
    };

    console.log("Aceptar PDI con ID:", id);

    fetch("/api/aceptar-pdi", requestOptions)
      .then((response) => {
        if (response.ok) {
            console.log(`${response.status} - ${response.statusText}`);
        } else {
          console.log(`Error: ${response.status} - ${response.statusText}`);
          return response.json().then((data) => {
            setError(data.Error || data.message);
            console.log("Detalles del error:", data);
          });
        }
      })
      .catch((error) => {
        console.log("Error de red o de servidor:", error);
        setError(error.message);
      });
  };

  const handleRechazar = (id) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
    };

    console.log("Rechazar PDI con ID:", id);

    fetch("/api/rechazar-pdi", requestOptions)
      .then((response) => {
        if (response.ok) {
            console.log(`${response.status} - ${response.statusText}`);
        } else {
          console.log(`Error: ${response.status} - ${response.statusText}`);
          return response.json().then((data) => {
            setError(data.message);
            console.log("Detalles del error:", data);
          });
        }
      })
      .catch((error) => {
        console.log("Error de red o de servidor:", error);
        setError(error.message);
      });
  };

  return (
    <Grid container spacing={2} direction="column" justifyContent="center">
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Puntos de Interés Pendientes de Revisión
        </Typography>
      </Grid>
      {error && (
        <Grid item xs={12} align="center">
          <Typography color="error">{error}</Typography> {/* Mostrar error si existe */}
        </Grid>
      )}
     <Grid item xs={12} align="center">
        <div style={{ maxHeight: "400px", overflow: "auto", width: "80%" }}>
          <List>
            {pdis.map((pdi) => (
              <ListItem key={pdi.id} divider>
                <ListItemText
                  primary={pdi.nombre}
                  secondary={`Ciudad: ${pdi.ciudad}, Dirección: ${pdi.direccion}, Categoría: ${pdi.categoria}, Descripción: ${pdi.descripcion}`}
                />
                {/* Botón de aceptar (tick) */}
                <IconButton color="primary" onClick={() => handleAceptar(pdi.id)}>
                  <CheckIcon />
                </IconButton>
                {/* Botón de rechazar (cruz) */}
                <IconButton color="secondary" onClick={() => handleRechazar(pdi.id)}>
                  <CloseIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={fetchPDIs}>
          Refrescar lista
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" onClick={Link}>
          Ir al inicio
        </Button>
      </Grid>
    </Grid>
  );
}
