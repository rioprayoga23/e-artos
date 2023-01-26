import { createSlice } from "@reduxjs/toolkit";
import { createPinAction, loginAction, registerAction } from "../action/auth";

const initialState = {
  token: null,
  isLoading: false,
  messageLogin: "",
  messageRegister: "",
  messagePin: "",
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
  },
  extraReducers: (build) => {
    build.addCase(loginAction.pending, (state) => {
      state.isLoading = true;
    });

    build.addCase(loginAction.rejected, (state) => {
      state.isLoading = false;
      state.messageLogin = "Wrong Email or Password";
    });

    build.addCase(loginAction.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.isLoading = false;
      state.messageLogin = "";
    });

    build.addCase(registerAction.pending, (state) => {
      state.isLoading = true;
    });

    build.addCase(registerAction.rejected, (state) => {
      state.isLoading = false;
      state.messageRegister = "Email Allready Used";
    });

    build.addCase(registerAction.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.messageRegister = "";
      state.isLoading = false;
    });

    build.addCase(createPinAction.pending, (state, { payload }) => {
      state.isLoading = true;
    });

    build.addCase(createPinAction.rejected, (state, { payload }) => {
      state.isLoading = false;
    });

    build.addCase(createPinAction.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.messagePin = "Success";
    });
  },
});

export const { logout } = authReducer.actions;

export default authReducer.reducer;
