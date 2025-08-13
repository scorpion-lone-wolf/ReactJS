export default function Progress({ index, qustionsLength, points, maxPossiblePoints }) {
  return (
    <header className="progress">
      <progress value={`${index}`} max={`${qustionsLength}`} />
      <p>
        Question : {`${index + 1}`} / {`${qustionsLength}`}
      </p>
      <p>
        Points : {points} / {maxPossiblePoints}
      </p>
    </header>
  );
}
