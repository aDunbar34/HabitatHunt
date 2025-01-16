import { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// This is where I import my GeoJSON data
import geoJsonData from "../JSON/geojson.json";
import { GeoJsonObject } from "geojson";

// Type assertion for the json data
const geoJsonTypedData: GeoJsonObject = geoJsonData as GeoJsonObject;

function openMap({
  highlightedCountries,
  setHighlightedCountries,
}: {
  highlightedCountries: string[];
  setHighlightedCountries: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  // Base styling for all countries
  const countryStyle = {
    fillColor: "#2E8B57",
    color: "#006400",
    weight: 2,
    fillOpacity: 0.5,
  };

  // Styling for a country highlighted after click event
  const highlightStyle = {
    fillColor: "#0cf272",
    color: "black",
    weight: 1,
    fillOpacity: 0.5,
  };

  // Function to handle clicks on a country
  const onCountryClick = (event: any) => {
    const layer = event.target;
    const countryName = layer.feature.properties.name; // Adjust to match your GeoJSON property

    setHighlightedCountries((prev) => {
      if (prev.includes(countryName)) {
        // If the country is already highlighted, remove it
        const updatedList = prev.filter((name) => name !== countryName);
        console.log("Updated Country List (removing):", updatedList); // Log after update
        return updatedList;
      } else {
        // Otherwise, add it to the list
        const updatedList = [...prev, countryName];
        console.log("Updated Country List (adding):", updatedList); // Log after update
        return updatedList;
      }
    });
  };

  const onEachCountry = (feature: any, layer: any) => {
    layer.on({
      click: onCountryClick, // Highlight and add country to list on click (or remove)
    });
  };

  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={2}
        minZoom={2}
        maxZoom={4}
        zoomControl={true}
        doubleClickZoom={false}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        style={{
          height: "99vh",
          width: "75vw",
          float: "right",

          border: "5px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        />

        <GeoJSON
          data={geoJsonTypedData}
          style={(feature) => {
            if (!feature || !feature.properties) {
              return countryStyle; // Fallback style if feature or properties are undefined
            }

            return highlightedCountries.includes(feature.properties.name)
              ? highlightStyle
              : countryStyle;
          }}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
    </>
  );
}

export default openMap;
