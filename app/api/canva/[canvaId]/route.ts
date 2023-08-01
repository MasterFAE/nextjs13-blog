import Canva from "@/shared/models/Canva";
import Todo from "@/shared/models/Todo";
import dbConnect from "@/shared/mongoConnection";
import mongoConnection from "@/shared/mongoConnection";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { canvaId: string }) {
  try {
    const { canvaId } = params;

    await dbConnect();

    let canva = await Canva.findById(canvaId).populate(Todo.collection.name);
    if (canva) {
      canva = {
        _id: canva._id.toString(),
        title: canva.title,
        user: canva.user.toString(),
        todos: canva.todos.map(JSON.stringify),
      };
      return new NextResponse(JSON.stringify(canva), {
        headers: { "content-type": "application/json" },
        status: 200,
      });
    }

    return new NextResponse("Canva not found", { status: 404 });
  } catch (error) {
    console.log("[CANVA_GET] ERROR: ", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { canvaId: string }) {
  try {
    const { canvaId } = params;

    //fetch user id from session
    let userId = "64bef0d811dd36a8ec0fb65f";

    await dbConnect();

    const canva = await Canva?.deleteOne({
      _id: canvaId,
      user: userId,
    });

    await Todo.deleteMany({
      canva: canvaId,
      user: userId,
    });

    console.log({ canva, canvaId, userId });
    return new NextResponse("Canva has successfully deleted");
  } catch (error) {
    console.log("[CANVA_DELETE] ERROR: ", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
