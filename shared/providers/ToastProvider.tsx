"use-client";
import React from "react";
import { Toaster } from "react-hot-toast";

type Props = {};

const ToastProvider = (props: Props) => {
  return <Toaster position="top-right" />;
};

export default ToastProvider;
