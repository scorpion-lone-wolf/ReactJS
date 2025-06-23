import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { pizzaData } from "./data";

function App() {
  console.log(pizzaData);
  return (
    <div>
      <h1>Hello World</h1>
      <Pizza />
      <Pizza />
      <Pizza />
      <Pizza />
    </div>
  );
}
function Pizza() {
  return (
    <div>
      <img src="pizzas/margherita.jpg" alt="Pizza Margherita" />
      <h2>Pizza Margherita</h2>
      <p>Tomato, mozarella, spinach, and ricotta cheese</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
