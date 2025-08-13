import { useEffect, useReducer } from "react";
import Error from "./Error";
import FinishScreen from "./FinishScreen";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import Progress from "./Progress";
import Question from "./Question";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],
  // "loading" ,"error" ,"ready" ,'active'(when quiz is running), "finished" (when quiz is finished)
  status: "loading",
  index: 0,
  points: 0,
  answer: null,
  highestScore: 0,
};
function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startGame":
      return { ...state, status: "active" };
    case "nextQuestion":
      if (state.index === state.questions.length - 1) {
        return {
          ...state,
          index: 0,
          answer: null,
          status: "finished",
          highestScore: state.points > state.highestScore ? state.points : state.highestScore,
        };
      }

      return { ...state, index: state.index + 1, answer: null };
    case "newAnswer":
      const currQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: payload,
        points:
          currQuestion.correctOption === payload
            ? state.points + currQuestion.points
            : state.points,
      };
    case "restart":
      return { ...state, status: "ready", index: 0, points: 0, answer: null };
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, points, answer, highestScore } = state;
  const qustionsLength = questions.length;
  const maxPossiblePoints = questions.reduce((prevValue, currValue) => {
    return prevValue + currValue.points;
  }, 0);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchData();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen nQuestions={questions.length} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              qustionsLength={qustionsLength}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              currQuestion={questions[index]}
              qustionsLength={qustionsLength}
              currQuestionIndex={index}
              answer={answer}
              points={points}
              dispatch={dispatch}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highestScore={highestScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
