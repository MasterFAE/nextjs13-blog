import { configureStore } from "@reduxjs/toolkit";
import { reducer as canvaReducer } from "@/redux/stores/canvas";
import { reducer as todoReducer } from "@/redux/stores/todo";
import { reducer as userReducer } from "@/redux/stores/user";
import { PreloadedState } from "./preloader/preloader";
export function createStore(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      todo: todoReducer,
      canva: canvaReducer,
      user: userReducer,
    },
    preloadedState,
  });

  return store;
}

export const store = createStore();
