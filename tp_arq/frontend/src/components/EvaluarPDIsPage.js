import React, { useEffect, useState } from "react";
import { Grid2 as Grid, Typography, List, ListItem, ListItemText, Button, IconButton, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export default function ListaPDIsPage() {
  const [pdis, setPdis] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchPDIs();
  }, []);

  const fetchPDIs = () => {
    fetch("/api/traer-pdis?estado=False")
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
            setSuccessMessage("Punto de interés aprobado con éxito");  // Mensaje de éxito
            fetchPDIs();  // Refrescar la lista después de la operación
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
            setSuccessMessage("Punto de interés rechazado con éxito");  // Mensaje de éxito
            fetchPDIs();  // Refrescar la lista después de la operación
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
        <Typography 
          variant="h3" 
          component="h3"
          align="center"
          sx={{ fontFamily: 'Poppins', fontWeight: 700, marginBottom: 4}}>
          Puntos de interés pendientes de revisión
        </Typography>
      </Grid>
      {error && (
        <Grid item xs={12} align="center">
          <Typography color="error">{error} sx={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: 15 }}</Typography>
        </Grid>
      )}
      {successMessage && (
        <Grid item xs={12} align="center">
          <Typography color="primary" sx={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: 15 }}>{successMessage}</Typography>
        </Grid>
      )}
     <Grid item xs={12} align="center">
        <div style={{ maxHeight: "400px", overflow: "auto", width: "80%" }}>
          <List>
            {pdis.map((pdi) => (
              <ListItem key={pdi.id} divider>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" color="secondary" component="div" sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 28, textTransform: 'uppercase' }}>
                    {pdi.nombre}
                  </Typography>
                  <br/>
                  <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
                    <strong>Ciudad:</strong> {pdi.ciudad}
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
                    <strong>Dirección:</strong> {pdi.direccion}
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
                    <strong>Categoría:</strong> {pdi.categoria}
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
                    <strong>Descripción:</strong> {pdi.descripcion}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <IconButton onClick={() => handleAceptar(pdi.id)} sx={{ mb: 1, color: "#27ae60"}} size="large">
                    <CheckIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton onClick={() => handleRechazar(pdi.id)} sx={{ mb: 1, color: "#e74c3c"}} size="large">
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={fetchPDIs} sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
          Refrescar lista
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="outlined" color="secondary" to="/mapa-admin" component={Link} sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
          Volver al inicio
        </Button>
      </Grid>
    </Grid>
  );
}
