import Todo from "@/shared/models/Todo";
import dbConnect from "@/shared/mongoConnection";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { todoId: string } }
) {
  try {
    const { todoId } = params;
    await dbConnect();
    const todo = await Todo.findById(todoId);
    todo.status = !todo.status;
    await todo.save();
    return new NextResponse(JSON.stringify(todo), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.log("[TODO_ID_PATCH] Error: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
