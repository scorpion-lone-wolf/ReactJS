import { useState } from "react";
import "./pricetable.css";

const Pricetable = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <div className="pricetable">
      <div className="pricetable__top">
        <h1>Our Pricing</h1>
        <div className="pricetable__season">
          <span>Anually</span>
          <label className="switch">
            <input
              type="checkbox"
              id="toggle"
              checked={isOn}
              onChange={() => {
                console.log("The toogle is ", isOn);
                setIsOn(!isOn);
              }}
            />
            <span className="slider"></span>
          </label>
          <span>Monthly</span>
        </div>
      </div>
      <div className="pricetable__box">
        <div className="pricetable__standard"></div>
        <div className="pricetable___professional"></div>
        <div className="pricetable__master"></div>
      </div>
    </div>
  );
};

export default Pricetable;
