import { Schema, model, models } from "mongoose";

const ToDoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: Boolean,
  },
  canva: {
    type: Schema.Types.ObjectId,
    ref: "Canva",
  },
});

export default models.Todo || model("Todo", ToDoSchema);
