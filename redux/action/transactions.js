import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../helpers/http";

export const transactionsAction = createAsyncThunk(
  "transactions/createTransactions",
  async ({ value, token, cb }) => {
    try {
      const form = new URLSearchParams({
        recipientId: value.recipientId,
        amount: value.amount,
        notes: value.notes,
        pin: value.pin,
      });
      const { data } = await http(token).post("/transactions/transfer", form);
      cb();
      return data.results;
    } catch (err) {
      throw err.response.data.message;
    }
  }
);
