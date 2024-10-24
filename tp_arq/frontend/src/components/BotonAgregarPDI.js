import React from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario

const BotonAgregarPDI = () => {
    const navigate = useNavigate(); // Hook para redirección

    const handleButtonClick = () => {
        navigate("/agregarPDI"); // Ruta de la página para agregar un PDI
    };

    const buttonStyle = {
        position: "fixed",
        bottom: "30px",
        right: "20px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#f39c12",
        color: "white",
        fontSize: "36px",
        border: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        zIndex: 1000,
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: "#d68910",
    };

    const [hover, setHover] = React.useState(false);

    return (
        <button 
            style={hover ? buttonHoverStyle : buttonStyle} 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
            onClick={handleButtonClick}
        >
            +
        </button>
    );
};

export default BotonAgregarPDI;