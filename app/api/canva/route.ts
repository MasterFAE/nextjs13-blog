import Canva from "@/shared/models/Canva";
import User from "@/shared/models/User";
import dbConnect from "@/shared/mongoConnection";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    let userId = "64bef0d811dd36a8ec0fb65f";
    await dbConnect();

    const canvas = await Canva.find({ user: userId });
    return new NextResponse(JSON.stringify(canvas), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.log("[CANVA_GET] ERROR: ", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    let userId = "64bef0d811dd36a8ec0fb65f";
    await dbConnect();

    const canva = new Canva({
      title,
      user: userId,
    });

    await canva.save();

    await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { canvas: canva._id } }
    );

    return new NextResponse(JSON.stringify(canva), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.log("[CANVA_CREATE] ERROR: ", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
