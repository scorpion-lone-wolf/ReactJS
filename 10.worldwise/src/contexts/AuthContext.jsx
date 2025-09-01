import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const FAKE_USER = {
  name: "Rahul",
  email: "admin@example.com",
  password: "admin",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "login":
      return { ...state, user: payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action type");
  }
}
export function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    console.log("login called ", email, password);
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
    return false;
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
