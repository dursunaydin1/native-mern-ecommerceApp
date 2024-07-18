import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({}, (builder) => {
  //  Login Case
  builder.addCase("loginRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("loginSuccess", (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuth = true;
  });
  builder.addCase("loginFailure", (state, action) => {
    state.isAuth = false;
    state.error = action.payload;
  });
  // Error Message Case
  builder.addCase("clearError", (state, action) => {
    state.error = null;
  });
  builder.addCase("clearMessage", (state, action) => {
    state.message = null;
  });
  // Get User Data Case
  builder.addCase("getUserRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("getUserSuccess", (state, action) => {
    state.loading = false;
    state.isAuth = true;
    state.user = action.payload;
  });
  builder.addCase("getUserFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  // Logout Case
  builder.addCase("logoutRequest", (state, action) => {
    state.loading = true;
  });
  builder.addCase("logoutSuccess", (state, action) => {
    state.loading = false;
    state.isAuth = false;
    state.user = null;
    state.message = action.payload;
  });
  builder.addCase("logoutFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
});
