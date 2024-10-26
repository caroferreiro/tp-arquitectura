import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const BotonLogOut = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const handleLogout = () => {
    setOpen(false);
    navigate(`/`);
    console.log("Cerrar sesión");
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const buttonStyle = {
    position: "fixed",
        top: "30px",
        right: "20px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        border: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: 1000,
    }

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  };
  
  return (
    <>
        <IconButton
        style={hover ? buttonHoverStyle : buttonStyle} 
        onMouseEnter={() => setHover(true)} 
        onMouseLeave={() => setHover(false)}
        onClick={handleOpenDialog}
        >
        <LogoutIcon />
        </IconButton>
        <Dialog
            open={open}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"¿Estás seguro que quieres salir?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Al salir cerrarás tu sesión actual.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
                Atrás
            </Button>
            <Button onClick={handleLogout} color="primary" autoFocus>
                Salir
            </Button>
            </DialogActions>
        </Dialog>
    </>
  );
};

export default BotonLogOut;
