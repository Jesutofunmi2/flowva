import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastError: {
    message: null,
  },
};

export const apiErrorSlice = createSlice({
  name: "apiError",
  initialState,
  reducers: {
    setApiErrorMessage: (state, action) => {
      state.toastError.message = action?.payload?.message;
    },
  },
});

export const {
  setApiErrorMessage,
} = apiErrorSlice.actions;
