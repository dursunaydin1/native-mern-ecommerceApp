import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({}, (builder) => {
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
  builder.addCase("clearError", (state, action) => {
    state.error = null;
  });
  builder.addCase("clearMessage", (state, action) => {
    state.message = null;
  });
});
