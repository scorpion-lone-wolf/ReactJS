import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Pricetable from "./components/Pricetable";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <ProfileCard /> */}
    <Pricetable />
  </StrictMode>
);
