import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  alignItems: "center",
};

export default function StarRating({ maxRating = 5, fillColor = "black" }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleMouseEnter(tempRating) {
    setTempRating(tempRating);
  }
  function handleMouseLeave() {
    setTempRating(0);
  }
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {new Array(maxRating).fill(0).map((_, i) => (
          <Start
            key={i}
            onRate={() => setRating(i + 1)}
            isFull={
              tempRating ? (tempRating >= i + 1 ? true : false) : rating >= i + 1 ? true : false
            }
            onMouseEnter={() => {
              handleMouseEnter(i + 1);
            }}
            onMouseLeave={handleMouseLeave}
            fillColor={fillColor}
          />
        ))}
      </div>
      <p style={{ margin: 0 }}>{tempRating || rating || ""}</p>
    </div>
  );
}

function Start({ onRate, isFull, onMouseEnter, onMouseLeave, fillColor }) {
  const star = (
    <span
      style={{
        cursor: "pointer",
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onRate}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isFull ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L9.09 8.5H2.83L7.83 12.59L5.91 18.5L12 15.59L18.09 18.5L16.17 12.59L21.17 8.5H14.91L12 2Z"
            fill={fillColor}
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L9.09 8.5H2.83L7.83 12.59L5.91 18.5L12 15.59L18.09 18.5L16.17 12.59L21.17 8.5H14.91L12 2Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
    </span>
  );

  return star;
}
