import "./pricetable.css";

const Pricetable = () => {
  return (
    <div className="pricetable">
      <div className="pricetable__top">
        <h1>Our Pricing</h1>
        <div className="pricetable__season">
          <span>Anually</span>
          <span>Toogle</span>
          <span>Monthly</span>
        </div>
      </div>
      <div className="pricetable__box">
        <div className="pricetable__standard">Standard</div>
        <div className="pricetable___professional">Professional</div>
        <div className="pricetable__master">Master</div>
      </div>
    </div>
  );
};

export default Pricetable;
