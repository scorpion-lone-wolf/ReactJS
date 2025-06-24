import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
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
      <h1>Fast React Pizza Co.</h1>;
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <div className="pizzas">
        <Pizza
          image={"pizzas/focaccia.jpg"}
          name={"Pizza Margherita"}
          ingredients={"Tomato, mozarella, spinach, and ricotta cheese"}
          price={10}
        />
        <Pizza
          image={"pizzas/focaccia.jpg"}
          name={"Pizza Margherita"}
          ingredients={"Tomato, mozarella, spinach, and ricotta cheese"}
          price={10}
        />
        <Pizza
          image={"pizzas/focaccia.jpg"}
          name={"Pizza Margherita"}
          ingredients={"Tomato, mozarella, spinach, and ricotta cheese"}
          price={10}
        />
        <Pizza
          image={"pizzas/focaccia.jpg"}
          name={"Pizza Margherita"}
          ingredients={"Tomato, mozarella, spinach, and ricotta cheese"}
          price={10}
        />
        <Pizza
          image={"pizzas/focaccia.jpg"}
          name={"Pizza Margherita"}
          ingredients={"Tomato, mozarella, spinach, and ricotta cheese"}
          price={10}
        />
        <Pizza
          image={"pizzas/focaccia.jpg"}
          name={"Pizza Margherita"}
          ingredients={"Tomato, mozarella, spinach, and ricotta cheese"}
          price={10}
        />
      </div>
    </main>
  );
}

function Pizza(props) {
  // object destructuring
  let { image, name, ingredients, price } = props;
  return (
    <div className="pizza">
      <img src={image} alt={name} />
      <div>
        <h2>{name}</h2>
        <p>{ingredients}</p>
        <span>{price + 30}</span>
      </div>
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 13;
  const isOpen = hour >= openHour && hour <= closeHour;

  const currentTime = new Date().toLocaleTimeString();
  return (
    <footer>
      {currentTime} - {isOpen ? "We are currently open!" : "We are closed!"}
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
