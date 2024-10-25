import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function LocationMarker({ setLatitud, setLongitud, setDireccion, setCiudad }) {
  const geocodeLocation = async (lat, lng) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    if (data && data.address) {
      setDireccion(data.display_name);
      setCiudad(data.address.city || data.address.town || data.address.village || "");
    }
  };

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLatitud(lat);
      setLongitud(lng);
      geocodeLocation(lat, lng);
    },
  });
  return null;
}

export default function SeleccionarPunto({ setLatitud, setLongitud, setDireccion, setCiudad, latitud, longitud }) {
  return (
    <MapContainer center={[-38.95231561788808, -68.05600596781214]} zoom={13} style={{ height: "300px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker setLatitud={setLatitud} setLongitud={setLongitud} setDireccion={setDireccion} setCiudad={setCiudad} />
      {latitud && longitud && <Marker position={[latitud, longitud]} />}
    </MapContainer>
  );
}
