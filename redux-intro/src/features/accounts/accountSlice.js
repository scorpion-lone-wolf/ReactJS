const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

//  Create a reducer function which return the new State
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload, isLoading: false };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return { ...state, balance: state.balance - state.loan, loan: 0, loanPurpose: "" };
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

//  Create an Action Creators
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // return a async function (thunk)
  return async function (dispatch) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`);
    const data = await res.json();
    const convertedAmount = (amount * data.rates["USD"]).toFixed(2);
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  };
}
export function payLoan() {
  return { type: "account/payLoan" };
}
