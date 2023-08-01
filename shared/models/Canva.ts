import { Schema, model, models } from "mongoose";
import Todo from "./Todo";
import User from "./User";

const CanvaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

export default models.Canva || model("Canva", CanvaSchema);
