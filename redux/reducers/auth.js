import { createSlice } from "@reduxjs/toolkit";
import { createPinAction, loginAction, registerAction } from "../action/auth";

const initialState = {
  token: null,
  isLoading: true,
  message: "",
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      return initialState;
    },
  },
  extraReducers: (build) => {
    build.addCase(loginAction.pending, (state, { payload }) => {
      state.isLoading = false;
    });

    build.addCase(loginAction.rejected, (state, { payload }) => {
      state.isLoading = true;
      state.message = "Wrong Email or Password";
    });

    build.addCase(loginAction.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.isLoading = true;
      state.message = "";
    });

    build.addCase(registerAction.pending, (state, { payload }) => {
      state.isLoading = false;
    });

    build.addCase(registerAction.rejected, (state, { payload }) => {
      state.isLoading = true;
      state.message = "Email Allready Used";
    });

    build.addCase(registerAction.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.isLoading = true;
      state.message = "";
    });

    build.addCase(createPinAction.pending, (state, { payload }) => {
      state.isLoading = false;
    });

    build.addCase(createPinAction.rejected, (state, { payload }) => {
      state.isLoading = true;
    });

    build.addCase(createPinAction.fulfilled, (state, { payload }) => {
      state.isLoading = true;
      state.message = "success";
    });
  },
});

export const { logout } = authReducer.actions;

export default authReducer.reducer;
