/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { extraReducers } from "./thunk.ts";
import { RootState } from "@/app/store";
import { Features } from "@/types/Feature.ts";
import { Status } from "@/types/Status.ts";
import { Toaster } from "@/types/Toaster.ts";
import { ToastProps } from "@/components/ui/toast.tsx";

export type BaseModel = {
  id?: string;
  // name: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface BaseState {
  list: BaseModel[];
  status: Status;
  error: Toaster & ToastProps;
}

const initialState: BaseState = {
  status: Status.Idle,
  list: [],
  error: {},
};

export const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    // logout: (state) => {
    //   console.log("logout");
    //   localStorage.removeItem("user");
    //   state.user = null;
    // },
  },
  extraReducers,
});

// export const getList = (state: RootState) => state.base.list;

// export const { logout } = authSlice.actions;

export default baseSlice.reducer;
export { login, register };
