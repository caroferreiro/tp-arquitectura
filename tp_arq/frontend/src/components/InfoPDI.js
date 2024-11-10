import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid2 as Grid, Typography, Box, Divider, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const InfoPDI = () => {
  const { id } = useParams();
  const [pdi, setPdi] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPDI = async () => {
      try {
        const response = await fetch(`/api/buscar-pdi?id=${id}`);
        const data = await response.json();
        console.log("Datos del PDI:", data); // Verifica la estructura
        setPdi(data);
      } catch (error) {
        console.error("Error al obtener los detalles del PDI:", error);
        setError("Error al obtener los detalles del PDI");
      }
    };

    obtenerPDI();
  }, [id]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!pdi) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Typography>Cargando...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <Paper 
        sx={{
          maxWidth: "700px",  
          width: "100%",       
          p: 4,
          borderRadius: 4,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Grid container spacing={2} direction="column" justifyContent="center">
          <Grid item xs={12} align="center">
            <Typography 
              variant="h3"
              sx={{ fontFamily: 'Poppins', fontWeight: 700, marginBottom: 2, textTransform: 'uppercase', color: 'secondary.main'}}
            >
              {pdi.nombre}
            </Typography>
          </Grid>

          {pdi.imagenes && pdi.imagenes.length > 0 && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                {pdi.imagenes.map((img) => (
                  <img 
                    key={img.id} 
                    src={img.imagen_url} 
                    alt={`Imagen de ${pdi.nombre}`} 
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: 8, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                  />
                ))}
              </Box>
            </Grid>
          )}

          <Grid item xs={12} align="left">
            {pdi.ciudad && (
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 400, mb: 1 }}>
                <strong>Ciudad:</strong> {pdi.ciudad}
              </Typography>
            )}
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 400, mb: 1 }}>
              <strong>Dirección:</strong> {pdi.direccion}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 400, mb: 1 }}>
              <strong>Categoría:</strong> {pdi.categoria}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 400, mb: 1 }}>
              <strong>Descripción:</strong> {pdi.descripcion}
            </Typography>
            <Divider sx={{ my: 1 }} />

            {pdi.fecha && pdi.horaInicio && pdi.horaFin && (
              <>
                <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 400, mb: 1 }}>
                  <strong>Fecha:</strong> {pdi.fecha}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 400, mb: 1 }}>
                  <strong>Hora de Inicio:</strong> {pdi.horaInicio}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 400, mb: 1 }}>
                  <strong>Hora de Finalización:</strong> {pdi.horaFin}
                </Typography>
              </>
            )}
          </Grid>

          <Grid item xs={12} align="center">
            <Button 
              variant="outlined" 
              color="secondary" 
              component={Link} 
              to="/mapa-usuario"
              sx={{ mt: 3, fontFamily: 'Poppins', fontWeight: 400 }}
            >
              Volver al inicio
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default InfoPDI;
