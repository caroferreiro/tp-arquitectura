import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {pdi.nombre}
      </Typography>
      <Typography variant="body1">
        <strong>Ciudad:</strong> {pdi.ciudad}
      </Typography>
      <Typography variant="body1">
        <strong>Dirección:</strong> {pdi.direccion}
      </Typography>
      <Typography variant="body1">
        <strong>Categoría:</strong> {pdi.categoria}
      </Typography>
      <Typography variant="body1">
        <strong>Descripción:</strong> {pdi.descripcion}
      </Typography>
    </Box>
  );
};

export default InfoPDI;
