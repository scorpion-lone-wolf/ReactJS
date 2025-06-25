import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProfileCard from "./components/ProfileCard";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProfileCard />
  </StrictMode>
);
