import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./auth";

const authConfig = {
  key: "auth",
  storage,
  blacklist: ["message"],
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth),
});

export default reducer;
