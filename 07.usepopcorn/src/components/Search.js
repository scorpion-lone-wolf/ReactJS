import { useRef } from "react";
import { useKey } from "../custom-hook/useKey";

export function Search({ query, setQuery }) {
  const inputEle = useRef(null);
  useKey("Enter", () => {
    if (document.activeElement === inputEle.current) return;
    inputEle.current.focus();
    setQuery("");
  });

  return (
    <input
      ref={inputEle}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
}
