/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Features } from "@/types/Feature.ts";
import { BaseState } from "./index.ts";
import { Status } from "@/types/Status.ts";
import { ReactNode } from "react";

const TYPE = "base";

export const createBase = createAsyncThunk(
  TYPE + "/create",
  async (data, { rejectWithValue }) => { }
);

export const fetchBase = createAsyncThunk(
  TYPE + "/fetch",
  async (data, { rejectWithValue }) => { }
);

export const updateBase = createAsyncThunk(
  TYPE + "/update",
  async (data, { rejectWithValue }) => { }
);
export const deleteBase = createAsyncThunk(
  TYPE + "/delete",
  async (data, { rejectWithValue }) => { }
);

export const extraReducers = (builder: ActionReducerMapBuilder<BaseState>) => {
  // CREATE
  builder.addCase(createBase.pending, (state) => {
    state.status = Status.Pending;
  });
  builder.addCase(createBase.rejected, (state, action) => {
    state.status = Status.Error;
    state.error = {
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: (
        <pre className="w-fit line-clamp-none whitespace-break-spaces">
          {(action.payload as ReactNode)}
        </pre>
      ),
    };
  });
  builder.addCase(createBase.fulfilled, (state, action) => {
    state.status = Status.Fulfilled;
  });

  // READ
  builder.addCase(fetchBase.pending, (state) => {
    state.status = Status.Pending;
  });
  builder.addCase(fetchBase.rejected, (state, action) => {
    state.status = Status.Error;
    state.error = {
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: (
        <pre className="w-fit line-clamp-none whitespace-break-spaces">
          {(action.payload as ReactNode)}
        </pre>
      ),
    };
  });
  builder.addCase(fetchBase.fulfilled, (state, { payload }) => {
    state.status = Status.Fulfilled;
    state.error = {};

  });
  // UPDATE
  builder.addCase(updateBase.pending, (state) => {
    state.status = Status.Pending;
  });
  builder.addCase(updateBase.rejected, (state, action) => {
    console.error(action);
    state.status = Status.Error;
    state.error = {
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: (
        <pre className="w-fit line-clamp-none whitespace-break-spaces">
          {(action.payload as ReactNode)}
        </pre>
      ),
    };
  });
  builder.addCase(updateBase.fulfilled, (state, { payload }) => {
    state.status = Status.Fulfilled;
    state.error = {
      description: `Record ${payload} updated.`,
    };
  });
  // DELETE
  builder.addCase(deleteBase.pending, (state) => {
    state.status = Status.Pending;
  });
  builder.addCase(deleteBase.rejected, (state, action) => {
    state.status = Status.Error;
    state.error = {
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: (
        <pre className="w-fit line-clamp-none whitespace-break-spaces">
          {(action.payload as ReactNode)}
        </pre>
      ),
    };
  });
  builder.addCase(deleteBase.fulfilled, (state, { payload }) => {
    state.status = Status.Fulfilled;
  });
};
