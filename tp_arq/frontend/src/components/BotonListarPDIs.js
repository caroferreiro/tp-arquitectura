import React from "react";
import { useNavigate } from "react-router-dom"; 

const BotonListarPDIs = () => {
    const navigate = useNavigate(); 

    const handleButtonClick = () => {
        navigate("/listar-pendientes");
    };

    const buttonStyle = {
        position: "fixed",
        bottom: "30px",
        right: "20px",
        width: "120px",
        height: "60px",
        borderRadius: "10px",
        backgroundColor: "#f39c12",
        color: "white",
        fontSize: "14px",
        fontFamily: "'Roboto', sans-serif",
        border: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        zIndex: 1000,
        fontFamily: "Poppins",
        fontWeight: 300,
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
            Ver pendientes
        </button>
    );
};

export default BotonListarPDIs;