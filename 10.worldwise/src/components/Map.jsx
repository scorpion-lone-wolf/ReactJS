import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  function handleClick() {
    navigate("form");
  }

  return (
    <div className={styles.mapContainer} onClick={handleClick}>
      Lat is {lat} and lng is {lng}
    </div>
  );
};

export default Map;
