import { useEffect, useRef } from "react";

function useOutsideClick({ close }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        close();
      }
    }

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [close]);
  return { modalRef };
}

export default useOutsideClick;
