import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { pizzaData } from "./data";
// css
import "./index.css";

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const numPizzas = pizzaData.length;
  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {numPizzas > 0 ? (
        <>
          <p>
            Authentic Italian Cuisine. 6 creative dishes to choose from. All from our stone oven,
            all organic, all delicious
          </p>
          <div className="pizzas">
            {pizzaData.map(pizza => {
              return <Pizza key={pizza.name} pizzaObj={pizza} />;
            })}
          </div>
        </>
      ) : (
        <p>We are working on our Menu.. Please Come back later :) </p>
      )}
    </main>
  );
}

function Pizza(props) {
  // object destructuring
  let { photoName, name, ingredients, price, soldOut } = props.pizzaObj;
  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt={name} />
      <div>
        <h2>{name}</h2>
        <p>{ingredients}</p>
        <span>{price}$</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 9;
  const closeHour = 15;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer>
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>
          We are happy to welcome you between {openHour}:00 and {closeHour}:00
        </p>
      )}
    </footer>
  );
}

function Order(props) {
  const closeHour = props.closeHour;
  return (
    <div className="order">
      <p>We're open until {closeHour}:00.Come Visit Us</p>
      <button className="btn">Order</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
