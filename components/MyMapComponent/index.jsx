import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "300px",
};

const center = {
  lat: 40.7128, // Replace with your latitude
  lng: -74.006, // Replace with your longitude
};

function MyMapComponent() {
  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyMapComponent);
