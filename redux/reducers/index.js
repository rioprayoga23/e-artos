import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./auth";
import transactions from "./transactions";

const authConfig = {
  key: "auth",
  storage,
  blacklist: ["message"],
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  transactions,
});

export default reducer;
