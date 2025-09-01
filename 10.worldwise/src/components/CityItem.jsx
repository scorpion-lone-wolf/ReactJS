import { Link } from "react-router-dom";
import useCities from "../hooks/useCities";
import styles from "./CityItem.module.css";

function CityItem({ city }) {
  const { currentCityData, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  const { lat, lng } = position;

  function handleCityDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          currentCityData.id === id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <span className={styles.name}>{cityName}</span>
        <span className={styles.date}>({formatDate(date)})</span>
        <button className={styles.deleteBtn} onClick={e => handleCityDelete(e)}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;

const formatDate = date =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
