import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder";

const Buscador = ({ pdIs }) => {
    const map = useMap();

    useEffect(() => {
        if (pdIs.length > 0) {
            // Centramos el mapa en el primer resultado encontrado
            const { latitud, longitud } = pdIs[0];
            const latlng = [latitud, longitud];
            map.setView(latlng, 13);
        }
    }, [pdIs, map]);

    return null;
};

export default Buscador;