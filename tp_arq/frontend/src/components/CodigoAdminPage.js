import React, { useState } from "react";
import { Grid2 as Grid, Button, Typography, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function CodigoAdminPage() {
  const [code, setCode] = useState("");
  const [errorMail, setErrorMail] = useState(""); 
  const [errorCode, setErrorCode] = useState(""); 
  const [mail, setMail] = useState("");
  const navigate = useNavigate(); 

  const isValidEmail = (email) => {
    // Expresión regular para validar el formato de un correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const adminButtonPressed = () => {
    // Resetea los mensajes de error
    setErrorMail("");
    setErrorCode("");

   
    let valid = true; // Variable para verificar la validez de las entradas

    // Validar el formato del correo electrónico
    if (!isValidEmail(mail)) {
      setErrorMail("Formato de mail inválido");
      valid = false; // Establece que hay un error
    }

    // Validar el código
    if (code !== "ABCD") {
      setErrorCode("Código inválido"); // Establece el mensaje de error para el código
      valid = false; // Establece que hay un error
    }

    // Si hay errores, no continuar con la solicitud
    if (!valid) return;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mail: mail }),
    };

    fetch("/api/agregar-admin", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/mapa-admin`);
        } else {
          return response.json().then((data) => {
            console.log("Detalles del error:", data);
            setErrorCode("Código inválido"); 
          });
        }
      })
      .catch((error) => {
        console.log("Error de red o de servidor:", error);
      });
  };

  return (
    <Grid container spacing={1} direction="column" justifyContent="center">
      <Grid item xs={12} align="center">
        <Typography
          variant="h3"
          compact="h3"
          sx={{ marginBottom: 6, fontFamily: 'Poppins', fontWeight: 700, fontSize: 40 }} 
        >
          Ingresá tu mail y el código para validarte como administrador
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
          error={!!errorMail} // Muestra error si hay un error en el correo
          helperText={errorMail} // Muestra el error de correo
          
        />
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={!!errorCode} // Muestra error si hay un error en el código
          label="Código"
          placeholder="Ingresá el código"
          type="password"
          value={code}
          helperText={errorCode} // Muestra el error de código
          variant="outlined"
          onChange={(e) => setCode(e.target.value)}
          sx={{ marginBottom: 3 }}
      
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={adminButtonPressed} sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
          Ingresar
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="outlined" color="secondary" component={Link} to="/" sx={{ fontFamily: 'Poppins', fontWeight: 400 }}>
          Atrás
        </Button>
      </Grid>
    </Grid>
  );
}
