import { NextResponse } from "next/server";
import Canva from "../models/Canva";
import dbConnect from "../mongoConnection";
import Todo from "../models/Todo";
import { todo } from "node:test";

export default async function getCanvaById(canvaId: string) {
  await dbConnect();

  let canva = await Canva.findById(canvaId).populate(Todo.collection.name);
  if (canva) {
    canva = {
      _id: canva._id.toString(),
      title: canva.title,
      todos: canva.todos.map((todo) => JSON.parse(JSON.stringify(todo))),
    };
    return canva;
  }
  return null;
}
