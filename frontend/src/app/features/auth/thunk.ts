import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Features } from "@/types/Feature.ts";
import { UserRegister } from "@/components/forms/register/schema";
import { AuthState } from "./index.ts";
import { Login } from "@/components/forms/login/schema";
import { Status } from "@/types/Status.ts";

const type = Features.Auth;

//REGISTER
export const register = createAsyncThunk(
  type + "/register",
  async ({ username, email, password }: UserRegister, { rejectWithValue }) => {
    const response = await axios.post("/user/", {
      username,
      email,
      password,
    });

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return username;
    }
    return rejectWithValue({});
  }
);

//LOGIN
export const login = createAsyncThunk(
  type + "/login",
  async ({ username, password }: Login, { rejectWithValue }) => {
    const response = await axios
      .post("/user/login", {
        username,
        password,
      })
      .then(({ data }) => data)
      .catch(({ response }) => ({
        status: response.status,
        statusText: response.statusText,
      }));
    if (response.token) {
      localStorage.setItem("user", JSON.stringify(response));
      return username;
    }
    return rejectWithValue(response);
  }
);

export const extraReducers = (builder: ActionReducerMapBuilder<AuthState>) => {
  // REGISTER
  builder.addCase(register.pending, (state) => {
    state.status = Status.Pending;
  });
  builder.addCase(register.rejected, (state) => {
    state.status = Status.Error;
  });
  builder.addCase(register.fulfilled, (state, action) => {
    state.status = Status.Fulfilled;
    state.user = action.payload;
  });

  // LOGIN
  builder.addCase(login.pending, (state) => {
    state.status = Status.Pending;
  });
  builder.addCase(login.rejected, (state) => {
    state.status = Status.Error;
  });
  builder.addCase(login.fulfilled, (state, action) => {
    state.status = Status.Fulfilled;
    state.user = action.payload;
  });
};
