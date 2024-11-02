import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid2 as Grid, Typography, Box, Divider, Button } from "@mui/material";
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
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box sx={{ p: 10 }}>
      <Grid container spacing={1} direction="column" justifyContent="center">
        <Grid item xs={12} align="center">
          <Typography 
            variant="h3"
            sx={{ fontFamily: 'Gloria Hallelujah', fontWeight: 700, marginBottom: 5, fontSize: 80, textTransform: 'uppercase' }}
          >
            {pdi.nombre}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          {pdi.imagenes && pdi.imagenes.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', marginBottom: 5 }}>
              {pdi.imagenes.map((img) => {
                console.log("URL de imagen:", img.imagen_url); // Verifica cada URL
                return (
                  <img 
                    key={img.id} 
                    src={img.imagen_url} 
                    alt={`Imagen de ${pdi.nombre}`} 
                    style={{ maxWidth: '300px', height: 'auto', borderRadius: 8 }}
                  />
                );
              })}
            </Box>
          )}
        </Grid>
        <Grid item xs={12} align="left">
          {pdi.ciudad && (
            <Typography variant="body1" align="left" sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
              <strong>Ciudad:</strong> {pdi.ciudad}
            </Typography>
          )}
          {pdi.ciudad && ( <Divider sx={{ my: 1 }} /> )}
          <Typography variant="body1" align="left" sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
            <strong>Dirección:</strong> {pdi.direccion}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1" align="left" sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
            <strong>Categoría:</strong> {pdi.categoria}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1" align="left" sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
            <strong>Descripción:</strong> {pdi.descripcion}
          </Typography>
          <Divider sx={{ my: 1 }} />

       
          {pdi.fecha && pdi.horaInicio && pdi.horaFin && (
            <>
              <Typography variant="body1" align="left" sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
                <strong>Fecha:</strong> {pdi.fecha}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1" align="left" sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
                <strong>Hora de Inicio:</strong> {pdi.horaInicio}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1" align="left" sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
                <strong>Hora de Finalización:</strong> {pdi.horaFin}
              </Typography>
              <Divider sx={{ my: 1 }} />
            </>
          )}
        </Grid>
        <Grid item xs={12} align="center">  
          <Button 
            variant="outlined" 
            color="secondary" 
            component={Link} 
            to="/mapa-usuario"
            sx={{ marginTop: 4, fontFamily: 'Poppins', fontWeight: 400 }} 
            >
            Volver al inicio
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfoPDI;
