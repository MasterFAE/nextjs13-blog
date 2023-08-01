import { ITodo } from "@/shared/interface";
import Canva from "@/shared/models/Canva";
import Todo from "@/shared/models/Todo";
import dbConnect from "@/shared/mongoConnection";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    //fetch user id from session
    let userId = "64bef0d811dd36a8ec0fb65f";

    //fetch canva id from body
    const { canvaId, title, content } = await request.json();

    if (!canvaId || !title) {
      return new Response("Missing items", { status: 400 });
    }

    await dbConnect();

    const newTodo = new Todo({
      title,
      content,
      canva: canvaId,
      user: userId,
      status: false,
    });

    await newTodo.save();

    await Canva.findByIdAndUpdate(
      { _id: canvaId },
      { $push: { todos: newTodo._id } }
    );
    console.log({ newTodo });
    return new NextResponse(JSON.stringify(newTodo), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.log("[TODO_CREATE] ERROR: ", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
