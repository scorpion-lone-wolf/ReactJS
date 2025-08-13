export default function FinishScreen({ points, maxPossiblePoints, highestScore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        You scored<strong> {points} </strong> out of <strong> {maxPossiblePoints} </strong>(
        {Math.ceil(percentage)} %)
      </p>
      <p className="highscore">(Heighest Score : {highestScore} points)</p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
        Restart Quiz
      </button>
    </>
  );
}
