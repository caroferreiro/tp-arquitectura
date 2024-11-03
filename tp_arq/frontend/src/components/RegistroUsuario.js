import React, { useState } from "react";
import { Grid2 as Grid, Button, Typography, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function RegistroUsuario() {
  const [mail, setMail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 

  const registrarseButtonPressed = () => {
    setError("");

    if (!mail || !contraseña) {
        setErrorCode("Por favor, completa todos los campos.");
        return;
    }

    if (contraseña.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres.");
        return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mail: mail, contraseña: contraseña }),
    };

    fetch("/api/agregar-usuario", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/mapa-usuario`);
        } else {
            setError("Mail o contraseña incorrectos."); 
        }
      })
      .catch((error) => {
        setError("Intentalo nuevamente."); 
      });
  };

  return (
    <Grid container spacing={1} direction="column" justifyContent="center">
      <Grid item xs={12} align="center">
        <Typography
          variant="h3"
          compact="h3"
          sx={{ marginBottom: 6, fontFamily: 'Poppins', fontWeight: 700, fontSize: 50 }} 
        >
          Registrarse
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          type="email"
          label="Mail"
          placeholder="Ingresá tu mail"
          value={mail}
          variant="outlined"
          onChange={(e) => setMail(e.target.value)}          
        />
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          label="Contraseña"
          placeholder="Ingresá tu contrasña"
          type="password"
          value={contraseña}
          variant="outlined"
          onChange={(e) => setContraseña(e.target.value)}
          sx={{ marginBottom: 3 }}
        />
      </Grid>
      <Grid item xs={12} align="center">
          {error && <Typography color="error" sx={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: 15 }}>{error}</Typography>}
        </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={registrarseButtonPressed} sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
          Registrarse
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="outlined" color="secondary" component={Link} to="/" sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
          Atrás
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          component={Link}
          to="/iniciar-sesion"
          sx={{
            color: "primary",
            fontFamily: "Poppins",
            fontWeight: 400,
            textDecoration: "underline",
            fontSize: 14,
            marginTop: 2,
            textTransform: "none"
          }}
        >
          ¿Ya tienes una cuenta?
        </Button>
      </Grid>
    </Grid>
  );
}