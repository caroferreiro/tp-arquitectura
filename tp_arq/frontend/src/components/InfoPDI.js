import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid2 as Grid, Typography, Box } from "@mui/material";

const InfoPDI = () => {
  const { id } = useParams();
  const [pdi, setPdi] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPDI = async () => {
      try {
        const response = await fetch(`/api/buscar-pdi?id=${id}`);
        const data = await response.json();
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
    <Box sx={{ p: 20 }}>
      <Grid container spacing={1} direction="column" justifyContent="center">
        <Grid item xs={12} align="center">
          <Typography variant="h4" gutterBottom>
            {pdi.nombre}
          </Typography>
        </Grid>
        <Grid item xs={12} align="left">
          {pdi.ciudad && (
            <Typography variant="body1">
              <strong>Ciudad:</strong> {pdi.ciudad}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} align="left">
          <Typography variant="body1" align="left">
            <strong>Dirección:</strong> {pdi.direccion}
          </Typography>
        </Grid>
        <Grid item xs={12} align="left">
          <Typography variant="body1" align="left">
            <strong>Categoría:</strong> {pdi.categoria}
          </Typography>
        </Grid>
        <Grid item xs={12} align="left">
          <Typography variant="body1" align="left">
            <strong>Descripción:</strong> {pdi.descripcion}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfoPDI;
