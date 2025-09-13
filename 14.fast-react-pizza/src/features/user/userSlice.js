import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// create thunk to fetch address
export const fetchAddress = createAsyncThunk(
  "/user/fetchAddress",
  async (_, { rejectWithValue }) => {
    try {
      // 1) We get the user's geolocation position
      const positionObj = await getPosition();
      const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };

      // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
      const addressObj = await getAddress(position);
      const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

      // 3) Then we return an object with the data that we are interested in
      return { position, address };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// slice has initalValue , reducerfn and actionCreatorfn
const initialState = {
  userName: "",
  status: "idle",
  error: "",
  position: {},
  address: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName: (state, action) => {
      // we can mutate the state becuase it will latter use Immer library to make it new State
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddress.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      const { position, address } = action.payload;
      state.status = "idle";
      state.position = position;
      state.address = address;
      state.error = "";
    });
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload;
    });
  },
});

// reducers
export default userSlice.reducer;
// actionCreators
export const { updateName } = userSlice.actions;
