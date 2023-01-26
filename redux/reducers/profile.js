import { createSlice } from "@reduxjs/toolkit";
import { getProfileAction } from "../action/profile";

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  picture: null,
  phoneNumber: null,
  balance: null,
  pinUser: null,
  isLoading: false,
};

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: () => {
      return initialState;
    },
  },
  extraReducers: (build) => {
    build.addCase(getProfileAction.fulfilled, (state, { payload }) => {
      state.id = payload.id;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.picture = payload.picture;
      state.email = payload.email;
      state.phoneNumber = payload.phoneNumber;
      state.balance = payload.balance;
      state.pinUser = payload.pin;
      state.isLoading = false;
    });
  },
});

export const { clearProfile: clearProfileAction } = profile.actions;
export default profile.reducer;
