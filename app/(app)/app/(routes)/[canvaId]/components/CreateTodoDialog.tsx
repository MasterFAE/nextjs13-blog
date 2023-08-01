"use client";
import React, { useState } from "react";
import { ListPlus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { createTodo } from "@/redux/stores/canvas";
import axiosInstance from "@/shared/axios";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1).max(50),
  content: z.string().min(0).max(2000),
});
const CreateTodoDialog = ({ setCanva }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const canvaId = pathname.split("/")[2];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      // dispatch(createTodo({ canvaId, ...values }));
      const todo = await axiosInstance.post(`/todo`, { ...values, canvaId });
      setCanva((prev) => ({ ...prev, todos: [...prev.todos, todo.data] }));
      toast.success("Todo created!");
    } catch (error) {
      toast.error("An error occured while creating!");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <ListPlus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>🎯 Create To Do</DialogTitle>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="🐶 Take the Lucy to walk."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="🌊 Don't forget to take the water can"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} type="submit">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodoDialog;
