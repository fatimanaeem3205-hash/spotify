import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("fakeToken") ? true : false,
  user: JSON.parse(localStorage.getItem("fakeUser")) || null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("fakeToken", "mock-jwt-token-string");
      localStorage.setItem("fakeUser", JSON.stringify(action.payload));
    },
    signupSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("fakeToken", "mock-jwt-token-string");
      localStorage.setItem("fakeUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem("fakeToken");
      localStorage.removeItem("fakeUser");
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("fakeUser", JSON.stringify(state.user));
      }
    },
  },
});

export const {
  loginSuccess,
  signupSuccess,
  logout,
  setAuthError,
  updateProfile,
} = authSlice.actions;
export default authSlice.reducer;
