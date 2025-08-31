import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import useCities from "../hooks/useCities";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";
import styles from "./Map.module.css";
const Map = () => {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    getPosition,
    position: geoLoacationPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLoacationPosition) setMapPosition([geoLoacationPosition.lat, geoLoacationPosition.lng]);
  }, [geoLoacationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLoacationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use Your Location"}
        </Button>
      )}
      <MapContainer center={mapPosition} zoom={7} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {cities.map(city => {
          return (
            <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
              <Popup>
                📍 This is {city.emoji} {city.cityName}
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: e => {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
}
export default Map;
