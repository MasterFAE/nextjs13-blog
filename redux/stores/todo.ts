import { createSlice } from "@reduxjs/toolkit";

export const { reducer, actions } = createSlice({
  name: "todo",
  initialState: {},
  reducers: {
    addTodo: (state, action) => {
      state = action.payload;
    },
  },
});
