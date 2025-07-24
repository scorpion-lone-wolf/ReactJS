import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DragNDrop from "./components/DragNDrop";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <ProfileCard /> */}
    {/* <Pricetable /> */}
    <DragNDrop />
  </StrictMode>
);
