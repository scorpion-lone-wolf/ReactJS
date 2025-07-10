import { useState } from "react";
import "./pricetable.css";

const Pricetable = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <div className="pricetable">
      <div className="pricetable__top">
        <h1>Our Pricing</h1>
        <div className="pricetable__season">
          <span>Annually</span>
          <button
            className={`pricetable__toggle ${isOn ? "toggle-color" : ""}`}
            onClick={() => setIsOn(!isOn)}
          >
            <span className={`pricetable__switch ${isOn ? "toggle" : ""}`}></span>
          </button>
          <span>Monthly</span>
        </div>
      </div>
      <div className="pricetable__box">
        <div className="pricetable__standard">Standard</div>
        <div className="pricetable__professional">Professional</div> {/* ✅ fixed */}
        <div className="pricetable__master">Master</div>
      </div>
    </div>
  );
};

export default Pricetable;
