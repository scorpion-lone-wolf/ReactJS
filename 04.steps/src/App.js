import { useState } from "react";
import "./app.css";

function App() {
  const [currentActive, setCurrentActive] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const messages = ["Learn React", "Build Projects", "Deploy your Projects"];

  function handlePrevious() {
    if (currentActive !== 1) {
      setCurrentActive(prevValue => prevValue - 1);
    }
  }

  function handleNext() {
    if (currentActive !== 3) {
      setCurrentActive(prevValue => prevValue + 1);
    }
  }

  // If we want to access any files from public we should do like this. Treat public like cdn
  fetch("/manifest.json")
    .then(response => response.json())
    .then(manifest => {
      console.log(manifest);
    });

  return (
    <div className="container">
      <button className="close" onClick={() => setIsOpen(prev => !prev)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`one ${currentActive >= 1 ? "active" : ""}`}>1</div>
            <div className={`two ${currentActive >= 2 ? "active" : ""}`}>2</div>
            <div className={`three ${currentActive >= 3 ? "active" : ""}`}>3</div>
          </div>
          <StepMessage step={currentActive}>{messages[currentActive - 1]}</StepMessage>
          <div className="buttons">
            <Button onClick={handlePrevious}>
              <span>👈</span> Previous
            </Button>
            <Button onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

function StepMessage({ step, children }) {
  return (
    <div className="messages">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
