// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import useCities from "../hooks/useCities";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";
import ButtonBack from "./Buttonback";
import styles from "./Form.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URl = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const { createCity, isLoading } = useCities();
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    async function fetchCityData() {
      try {
        if (!lat && !lng) return;
        setIsLoadingGeocoding(true);
        setGeoCodingError("");
        const res = await fetch(`${BASE_URl}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error("That doesn't seem to be a country. Click somewhere else.");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!country || !cityName) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    createCity(newCity);
    navigate("/app/cities");
  }
  if (!lat && !lng) return <Message message={geoCodingError} />;
  if (geoCodingError) return <Message message={geoCodingError} />;
  if (isLoadingGeocoding) return <Spinner />;
  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input id="cityName" onChange={e => setCityName(e.target.value)} value={cityName} />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input id="date" onChange={e => setDate(e.target.value)} value={date} /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={date => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" onChange={e => setNotes(e.target.value)} value={notes} />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
