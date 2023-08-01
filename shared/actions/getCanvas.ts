import { NextResponse } from "next/server";
import Canva from "../models/Canva";
import dbConnect from "../mongoConnection";

export default async function getCanvas() {
  //get user id
  let userId = "64bef0d811dd36a8ec0fb65f";
  await dbConnect();

  const canvas = await Canva.find({ user: userId }).select("title _id");
  if (!canvas) {
    return null;
  }
  const data = canvas.map((canva) => ({
    _id: canva._id.toString(),
    title: canva.title,
  }));
  return data;
}
