import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import { thunk } from "redux-thunk";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// combine reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//  Create a store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;
