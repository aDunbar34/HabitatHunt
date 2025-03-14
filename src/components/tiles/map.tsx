import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// This is where I import my GeoJSON data
import geoJsonData from "../../JSON/geojson.json";
import { GeoJsonObject } from "geojson";

// Type assertion for the json data
const geoJsonTypedData: GeoJsonObject = geoJsonData as GeoJsonObject;

function openMap({
  highlightedCountries,
  setHighlightedCountries,
  highlightedRegions,
}: {
  highlightedCountries: string[];
  setHighlightedCountries: React.Dispatch<React.SetStateAction<string[]>>;
  highlightedRegions: string[];
  setHighlightedRegions: React.Dispatch<React.SetStateAction<string[]>>;
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

  // Styling for a region highlighted for hint purposes
  const hintStyle = {
    fillColor: "#ffcc00", // Yellow for continent highlighting
    color: "black",
    weight: 1,
    fillOpacity: 0.4,
  };

  const onCountryClick = (event: any) => {
    const layer = event.target;
    const countryName = layer.feature.properties.name;

    setHighlightedCountries((prev) => {
      if (prev.includes(countryName)) {
        // If the country has already been highlighted/on the guess list we remove it
        const updatedList = prev.filter((name) => name !== countryName);
        console.log("Updated Country List (removing):", updatedList); // Show on console (for testing)
        return updatedList;
      } else {
        // Otherwise we add to list and highlight
        const updatedList = [...prev, countryName];
        console.log("Updated Country List (adding):", updatedList); // Show on console (for testing)
        return updatedList;
      }
    });
  };

  const onEachCountry = (_feature: any, layer: any) => {
    layer.on({
      click: onCountryClick, // Highlight and add country to list on click (or remove)
    });
  };

  return (
    <>
      <MapContainer
        className="map"
        center={[51.505, -0.09]}
        zoom={3}
        minZoom={2}
        maxZoom={4}
        zoomControl={true}
        doubleClickZoom={false}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        />

        <GeoJSON
          data={geoJsonTypedData}
          style={(feature) => {
            if (!feature || !feature.properties) {
              return countryStyle;
            }

            const countryName = feature.properties.name;

            if (highlightedCountries.includes(countryName)) {
              return highlightStyle; // Bright green for manually selected
            }
            if (highlightedRegions.includes(countryName)) {
              console.log(highlightedRegions);
              return hintStyle; // Yellow for continent highlights
            }

            return countryStyle;
          }}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
    </>
  );
}

export default openMap;
