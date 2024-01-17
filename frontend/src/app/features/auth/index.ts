import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { login, register, extraReducers } from "./thunk.ts";
import { RootState } from "@/app/store";
import { Features } from "@/types/Feature.tsx";
import { Status } from "@/types/Status.tsx";

const user = () => {
  const token = localStorage.getItem("user");
  if (token) return JSON.parse(token)?.username;
  else return null;
};

export interface AuthState {
  user: string | null;
  status: Status;
}

const initialState: AuthState = {
  user: user(),
  status: Status.Idle,
};

export const authSlice = createSlice({
  name: Features.Auth,
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers,
});

export const getCurrentUser = (state: RootState) => state.auth.user;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
export { login, register };
