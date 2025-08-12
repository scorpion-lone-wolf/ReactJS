export default function StartScreen({ nQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{nQuestions} questions to test your React mastery</h3>
      <button className="btn">Start Quiz</button>
    </div>
  );
}
