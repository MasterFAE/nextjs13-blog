"use client";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from ".";
import PreloadResetter from "./preloader/reset";

const StoreProvider = ({ children, preloadedState }) => {
  const store = createStore(preloadedState);
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
