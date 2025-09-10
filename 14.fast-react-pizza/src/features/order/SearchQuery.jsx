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
    <form onSubmit={e => handleSubmit(e)}>
      <input
        className="bg-stone-100"
        type="text"
        placeholder="Search order #"
        name="search"
        value={query}
        onChange={e => {
          setQuery(e.target.value);
        }}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchQuery;
