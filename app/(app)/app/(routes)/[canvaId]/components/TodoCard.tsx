"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ITodo } from "@/shared/interface";
import { Separator } from "@/components/ui/separator";
import { Check, Hourglass, Loader2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { actions } from "@/redux/stores/canvas";
import { useRouter } from "next/navigation";
import TodoContent from "./TodoContentDialog";
import TodoContentDialog from "./TodoContentDialog";
type Props = {
  data: ITodo;
};

// ADDING TODO BUGGED

const TodoCard: React.FC<Props> = ({ data }) => {
  const router = useRouter();

  const [todo, setTodo] = useState<ITodo>(data);
  const [loading, setLoading] = useState(false);

  const handleTodoClick = async () => {
    try {
      if (loading) return;
      setLoading(true);
      await axios.patch(`/api/todo/${todo._id}`);
      setTodo({ ...todo, status: !todo.status });
      router.refresh();

      toast.success("Todo updated successfully");
    } catch (error) {
      console.log({ error });
      toast.error("An error occured while updating the todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className={cn(
        "cursor-pointer hover:bg-muted transition-colors",
        todo.status && "bg-muted"
      )}>
      <CardHeader>
        <div className="flex gap-x-3 items-center">
          {loading ? (
            <Button
              size={"icon"}
              variant={todo.status ? "default" : "secondary"}>
              <Loader2 className="w-4 h-4 animate-spin" />
            </Button>
          ) : (
            <>
              {todo.status ? (
                <Button size={"icon"} onClick={handleTodoClick}>
                  <Check className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  size={"icon"}
                  variant={"secondary"}
                  onClick={handleTodoClick}>
                  <Hourglass className="w-5 h-5" />
                </Button>
              )}
            </>
          )}
          <TodoContentDialog
            todo={todo}
            handleTodoClick={handleTodoClick}
            loading={loading}>
            <CardTitle className={todo.status ? " line-through" : ""}>
              {todo.title}
            </CardTitle>
          </TodoContentDialog>
        </div>
        {/* {todo.content && <Separator />} */}
      </CardHeader>
      {/* {todo.content && <CardContent>{todo.content}</CardContent>} */}
    </Card>
  );
};

export default TodoCard;
