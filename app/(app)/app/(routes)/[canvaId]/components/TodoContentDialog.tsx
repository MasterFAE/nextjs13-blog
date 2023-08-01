import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ITodo } from "@/shared/interface";
import { Loader2, Check, Hourglass } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  children: React.ReactNode;
  todo: ITodo;
  loading: boolean;
  handleTodoClick: () => void;
};

const TodoContentDialog: React.FC<Props> = ({
  children,
  todo,
  loading,
  handleTodoClick,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
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

              {todo.title}
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="p-2">
            {todo.content.length > 0 ? (
              <ReactMarkdown
                children={todo.content}
                remarkPlugins={[remarkGfm]}
              />
            ) : (
              <p className="text-muted-foreground">No content provided.</p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TodoContentDialog;
