import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./auth";
import transactions from "./transactions";
import profile from "./profile";

const authConfig = {
  key: "auth",
  storage,
  blacklist: ["message"],
};

const profileConfig = {
  key: "profile",
  storage,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  transactions,
  profile: persistReducer(profileConfig, profile),
});

export default reducer;
