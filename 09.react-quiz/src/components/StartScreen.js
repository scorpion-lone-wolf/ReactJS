export default function StartScreen({ nQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{nQuestions} questions to test your React mastery</h3>
      <button className="btn" onClick={() => dispatch({ type: "startGame" })}>
        Start Quiz
      </button>
    </div>
  );
}
