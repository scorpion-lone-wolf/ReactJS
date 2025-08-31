import { createContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [currentCityData, setCurrentCityData] = useState({});

  useEffect(() => {
    async function fetchCities() {
      setIsLoading(true);
      const res = await fetch("http://localhost:8000/cities");
      const data = await res.json();
      setCities(data);
      setIsLoading(false);
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    setIsLoading(true);
    const res = await fetch(`http://localhost:8000/cities/${id}`);
    const data = await res.json();
    setCurrentCityData(data);
    setIsLoading(false);
  }

  async function createCity(newCity) {
    setIsLoading(true);
    const res = await fetch(`http://localhost:8000/cities`, {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    setCities(cities => [...cities, data]);
  }

  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        isloading: isloading,
        getCity,
        createCity,
        currentCityData,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContext, CitiesProvider };
