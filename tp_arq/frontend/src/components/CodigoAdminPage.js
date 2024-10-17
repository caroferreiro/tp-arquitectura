import React, { useState } from "react";
import { Grid2 as Grid, Button, Typography, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function CodigoAdminPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [mail, setMail] = useState("");
  const navigate = useNavigate(); // Usar el hook useNavigate para navegación

  const adminButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mail: mail }),
    };

    if (code === "ABCD") {
      fetch("/api/agregar-admin", requestOptions)
        .then((response) => {
          if (response.ok) {
            navigate(`/`);
            console.log("Admin agregado con éxito")
          } else {
            return response.json().then((data) => {
              console.log("Detalles del error:", data);
              console.error("Error en la solicitud:", error.message);
            });
          }
        })
        .catch((error) => {
          console.log("Error de red o de servidor:", error);
        });
    } else {
      setError("Código inválido");
    }
  };

  return (
    <Grid container spacing={2} direction="column" justifyContent="center">
      <Grid item xs={12} align="center">
        <Typography variant="h3" compact="h3">
          Ingresa tu mail y el código para validarte como administrador
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={!!error}
          label="Mail"
          placeholder="Ingresá tu mail"
          value={mail}
          helperText={error}
          variant="outlined"
          onChange={(e) => setMail(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={!!error}
          label="Código"
          placeholder="Ingresá el código"
          value={code}
          helperText={error}
          variant="outlined"
          onChange={(e) => setCode(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={adminButtonPressed}>
          Ingresar
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" component={Link} to="/ingresar">
          Atrás
        </Button>
      </Grid>
    </Grid>
  );
}