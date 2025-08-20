import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

function App() {
  const [cities, setCities] = useState([]);
  const [isloading, setIsLoading] = useState(false);

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
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          {/* This is an index route */}
          <Route index element={<CityList cities={cities} isloading={isloading} />} />
          {/* This are nested routes */}
          <Route path="cities" element={<CityList cities={cities} isloading={isloading} />} />
          {/* create a dynamic route */}
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList cities={cities} isloading={isloading} />} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
