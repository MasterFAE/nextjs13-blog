import axiosInstance from "@/shared/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getCanvas = createAsyncThunk("get-canvas", async () => {
  const { data } = await axiosInstance.get("canva");
  return data;
});

export const getCanvaById = createAsyncThunk("get-canva-by-id", async (id) => {
  try {
    let { data } = await axiosInstance.get(`/canva/${id}`);
    data.todos = data.todos.map((todo) => JSON.parse(todo));
    return data;
  } catch (error) {}
});

export const deleteCanva = createAsyncThunk("delete-canva", async (id) => {
  try {
    await axiosInstance.delete(`/canva/${id}`);
    toast.success("Canva deleted successfully");
    return id;
  } catch (error) {
    toast.error("Canva not deleted");
  }
});

export const createCanva = createAsyncThunk(
  "create-canva",
  async ({ title }) => {
    try {
      const { data } = await axiosInstance.post("/canva", { title });
      toast.success("Canva created successfully");
      return data;
    } catch (error) {
      toast.error("Canva not created");
    }
  }
);

export const createTodo = createAsyncThunk(
  "create-todo",
  async ({ title, content, canvaId }) => {
    try {
      const { data } = await axiosInstance.post("/todo", {
        title,
        content,
        canvaId,
      });
      toast.success("Todo created successfully");
      return data;
    } catch (error) {
      toast.error("Todo not created");
    }
  }
);

export const { reducer, actions } = createSlice({
  name: "canva",
  initialState: {
    canvas: [],
    currentCanva: {
      _id: null,
      title: null,
      todos: [],
      loading: true,
    },
    loading: true,
  },
  reducers: {
    switchTodoStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.currentCanva.todos.findIndex(
        (todo) => todo._id === id
      );
      state.currentCanva.todos[index].status = status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCanvas.fulfilled, (state, action) => {
      state.canvas = action.payload;
      state.loading = false;
    });
    builder.addCase(getCanvas.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCanvaById.fulfilled, (state, action) => {
      state.currentCanva = action.payload;
      state.currentCanva.loading = false;
    });
    builder.addCase(getCanvaById.pending, (state, action) => {
      state.currentCanva.loading = true;
    });
    builder.addCase(getCanvas.rejected, (state, action) => {
      state.currentCanva = null;
    });
    builder.addCase(deleteCanva.fulfilled, (state, action) => {
      state.canvas = state.canvas.filter(
        (canva) => canva._id !== action.payload
      );
    });
    builder.addCase(createCanva.fulfilled, (state, action) => {
      state.canvas.push(action.payload);
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.currentCanva.todos.push(action.payload);
    });
  },
});
