import { combineReducers, legacy_createStore as createStore } from "redux";

//  Create Initial State
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

//  Create a reducer function which return the new State
function accountReducer(state = initialStateAccount, action) {
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

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};
function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

// combine reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//  Create a store
const store = createStore(rootReducer);

//  Create an Action Creators
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

// Dispatch the Actions with Action Creator fn
store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(300));
console.log(store.getState());

store.dispatch(requestLoan(15000, "Buy a House"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

// action creators
function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName: fullName,
      nationalID: nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

//dispatch customer actions
store.dispatch(createCustomer("Rahul", "IND1234"));
console.log(store.getState());

store.dispatch(updateName("Pursotam"));
console.log(store.getState());
