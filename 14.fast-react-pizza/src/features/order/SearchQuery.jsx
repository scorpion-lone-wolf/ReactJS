import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchQuery = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 focus:ring focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none sm:w-64 sm:focus:w-72"
        type="text"
        placeholder="Search order #"
        name="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchQuery;
