import { useState } from "react";
import "./app.css";
function App() {
  const [currentActive, setCurrentActive] = useState(1);
  const messages = ["Learn React", "Build Projects", "Deploy your Projects"];
  return (
    <div className="steps">
      <div className="numbers">
        <div className={`one ${currentActive >= 1 ? "active" : ""}`}>1</div>
        <div className={`two ${currentActive >= 2 ? "active" : ""}`}>2</div>
        <div className={`three ${currentActive >= 3 ? "active" : ""}`}>3</div>
      </div>
      <p className="messages">
        Step {currentActive} : {messages[currentActive - 1]}
      </p>
      <div className="buttons">
        <button
          onClick={() => {
            if (currentActive !== 1) {
              setCurrentActive(prevValue => prevValue - 1);
            }
          }}
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (currentActive !== 3) {
              setCurrentActive(prevValue => prevValue + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
