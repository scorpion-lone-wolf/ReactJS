import Options from "./Options";

export default function Question({ currQuestion, answer, dispatch }) {
  return (
    <div>
      <h4>{currQuestion.question}</h4>
      <Options question={currQuestion} answer={answer} dispatch={dispatch} />
      {answer != null ? (
        <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>
          next
        </button>
      ) : null}
    </div>
  );
}
