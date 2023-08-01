"use client";
import React, { useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { Loader2 } from "lucide-react";
import CreateTodoDialog from "./CreateTodoDialog";
import TodosList from "./TodosList";

const CanvaClient = ({ canva }) => {
  const [currentCanva, setCanva] = useState(canva);
  if (currentCanva.loading) {
    return (
      <div className="flex justify-center h-full items-center gap-x-2">
        <Loader2 className="animate-spin w-5 h-5" />
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex justify-between py-2">
        <div className="">
          <h4 className="text-lg font-light text-muted-foreground">
            #{currentCanva._id}
          </h4>
          <h2 className="text-2xl text-medium">{currentCanva.title}</h2>
        </div>
        <CreateTodoDialog setCanva={setCanva} />
      </div>
      <Separator />

      <TodosList todos={currentCanva.todos} />
    </div>
  );
};

export default CanvaClient;
