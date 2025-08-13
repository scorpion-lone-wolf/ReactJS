export default function Options({ question, answer, dispatch }) {
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${answer === index ? "answer" : ""} ${
              answer === null ? "" : index === question.correctOption ? " correct" : " wrong"
            }`}
            disabled={answer !== null && "disabled"}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            key={option}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
