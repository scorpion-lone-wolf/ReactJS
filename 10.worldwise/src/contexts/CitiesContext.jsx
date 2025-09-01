import { createContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isloading: false,
  currentCityData: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isloading: true };
    case "cities/loaded":
      return { ...state, isloading: false, cities: action.payload };
    case "city/laoded":
      return { ...state, isloading: false, currentCityData: action.payload };
    case "cities/created":
      return { ...state, isloading: false, cities: [...state.cities, action.payload] };
    case "cities/deleted":
      return {
        ...state,
        isloading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
      };
    case "rejected":
      return { ...state, isloading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isloading, currentCityData }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        console.log(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "There was an error loading data" });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    dispatch({ type: "loading" });
    const res = await fetch(`http://localhost:8000/cities/${id}`);
    const data = await res.json();
    dispatch({ type: "city/laoded", payload: data });
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    const res = await fetch(`http://localhost:8000/cities`, {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch({ type: "cities/created", payload: data });
  }

  async function deleteCity(id) {
    await fetch(`http://localhost:8000/cities/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "cities/deleted", payload: id });
  }

  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        isloading: isloading,
        getCity,
        createCity,
        deleteCity,
        currentCityData,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContext, CitiesProvider };
