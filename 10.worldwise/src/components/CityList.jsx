import useCities from "../hooks/useCities";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

const CityList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }
  if (cities.length == 0) {
    return <Message message="Add you first city by clicking on the map" />;
  }
  return (
    <div className={styles.cityList}>
      {cities.map(city => {
        return <CityItem city={city} key={city.id} />;
      })}
    </div>
  );
};

export default CityList;
