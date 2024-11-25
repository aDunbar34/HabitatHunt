import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";

function openMap() {
  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={3}
        zoomControl={false} // lock the map at the given zoom level
        scrollWheelZoom={false}
        style={{
          height: "99vh",
          width: "75vw",
          float: "right",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        />
      </MapContainer>
    </>
  );
}

export default openMap;
