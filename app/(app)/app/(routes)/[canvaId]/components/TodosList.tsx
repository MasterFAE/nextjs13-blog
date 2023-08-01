"use client";
import { ListPlus } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import TodoCard from "./TodoCard";

type Props = {};

const TodosList = ({ todos }) => {
  return (
    <div className="h-full  border rounded-lg mt-4 p-4 flex flex-col gap-y-3">
      {todos && todos.length > 0 ? (
        <>
          {todos.map((todo) => (
            <TodoCard key={todo._id} data={todo} />
          ))}
        </>
      ) : (
        <div className="flex justify-center h-full items-center gap-x-2">
          <ListPlus className="w-4 h-4 text-muted-foreground" />
          <p className="text-base text-muted-foreground">No todos yet</p>
        </div>
      )}
    </div>
  );
};

export default TodosList;
