import axiosInstance from "@/shared/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentUser = createAsyncThunk("get-current-user", async () => {
  const { data } = await axiosInstance("user");
  return data;
});

export const { reducer, actions } = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
