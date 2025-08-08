import { useEffect, useState } from "react";
export function useLocalStorageState(initialValue, key) {
  const [value, setValue] = useState(() => {
    // fetching data from local stoage (lazy evaluation of state)
    return JSON.parse(localStorage.getItem(key)) ?? initialValue;
  });

  useEffect(
    function () {
      // adding watched array data into local storage
      localStorage.setItem(key, JSON.stringify([...value]));
    },
    [value, key]
  );
  return [value, setValue];
}
