import { createSlice } from "@reduxjs/toolkit";
import { transactionsAction } from "../action/transactions";

const initialState = {
  recipientId: "",
  amount: "",
  notes: "",
  pin: "",
  isLoading: true,
  status: "",
};

const transactionsReducer = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    chooseRecipient: (state, action) => {
      state.recipientId = action.payload.recipientId;
    },
    chooseAmount: (state, action) => {
      state.amount = action.payload.amount;
      state.notes = action.payload.notes;
    },
  },
  extraReducers: (build) => {
    build.addCase(transactionsAction.pending, (state, { payload }) => {
      state.isLoading = false;
    });
    build.addCase(transactionsAction.rejected, (state, { payload }) => {
      state.isLoading = false;
    });
    build.addCase(transactionsAction.fulfilled, (state, { payload }) => {
      state.status = "success";
    });
  },
});

export const { chooseRecipient, chooseAmount } = transactionsReducer.actions;

export default transactionsReducer.reducer;
