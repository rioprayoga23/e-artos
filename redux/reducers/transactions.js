import { createSlice } from "@reduxjs/toolkit";
import { transactionsAction } from "../action/transactions";

const initialState = {
  recipientId: "",
  amount: "",
  notes: "",
  pin: "",
  isLoading: false,
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
    build.addCase(transactionsAction.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(transactionsAction.rejected, (state) => {
      state.isLoading = false;
    });
    build.addCase(transactionsAction.fulfilled, (state) => {
      state.isLoading = false;
      state.status = "success";
    });
  },
});

export const { chooseRecipient, chooseAmount } = transactionsReducer.actions;

export default transactionsReducer.reducer;
