import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/auth/userReducer";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});

export const server = "http://192.168.32.1:5000/api/v1";
