import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

const CountryList = ({ cities, isLoading }) => {
  if (isLoading) {
    return <Spinner />;
  }
  if (cities.length == 0) {
    return <Message message="Add you first city by clicking on the map" />;
  }

  const countries = cities.reduce((acc, city) => {
    if (acc.map(el => el.country).includes(city.country)) {
      return acc;
    } else {
      return [...acc, { country: city.country, emoji: city.emoji, id: city.id }];
    }
  }, []);
  return (
    <div className={styles.countryList}>
      {countries.map(country => {
        return <CountryItem country={country} key={country.id} />;
      })}
    </div>
  );
};

export default CountryList;
