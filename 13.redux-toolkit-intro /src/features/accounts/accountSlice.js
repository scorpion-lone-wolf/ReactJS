import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// ✅ Async thunk: convert currency before deposit
export const depositAsync = createAsyncThunk(
  "account/depositAsync",
  async ({ amount, currency }, { dispatch, rejectWithValue }) => {
    try {
      if (currency === "USD") {
        dispatch(deposit(amount)); // directly deposit
        return;
      }
      const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`);
      const data = await res.json();
      const convertedAmount = (amount * data.rates["USD"]).toFixed(2);
      dispatch(deposit(Number(convertedAmount)));
    } catch (err) {
      return rejectWithValue("Currency conversion failed");
    }
  }
);
const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    deposit: (state, action) => {
      state.balance = state.balance + action.payload;
    },
    withdraw: (state, action) => {
      state.balance = state.balance - action.payload;
    },
    requestLoan: (state, action) => {
      if (state.loan > 0) return;
      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.purpose;
      state.balance = state.balance + action.payload.amount;
    },
    payLoan: state => {
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
  extraReducers: builder => {
    builder
      .addCase(depositAsync.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(depositAsync.pending, state => {
        state.isLoading = true;
      })
      .addCase(depositAsync.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.payload);
      });
  },
});

// export action creators
export const { deposit, withdraw, requestLoan, payLoan, convertingCurrency } = accountSlice.actions;
// export accountReducer
export default accountSlice.reducer;
