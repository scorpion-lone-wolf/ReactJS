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
      console.log(data);
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

  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        isloading: isloading,
        getCity,
        currentCityData,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContext, CitiesProvider };
