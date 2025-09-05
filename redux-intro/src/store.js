import { createStore } from "redux";

// Step 1 : Create Initial State
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// Step 2: Create a reducer function which return the new State
function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
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
    default:
      return state;
  }
}

// Step 3 : Create a store
const store = createStore(reducer);

// Step 4 : Create an Action Creators
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

// Step 5 : Dispatch the Actions with Action Creator fn
store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(300));
console.log(store.getState());

store.dispatch(requestLoan(15000, "Buy a House"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());
