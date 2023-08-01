import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  profilePicture: String,
});

export default models.User || model("User", UserSchema);
