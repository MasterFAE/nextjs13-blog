"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";

type Props = {};

const CreateUserComponent = (props: Props) => {
  const createUser = async () => {
    axios.post("/api/auth/register", {
      username: "test",
      password: "test",
    });
  };
  return <Button onClick={createUser}>Create</Button>;
};

export default CreateUserComponent;
