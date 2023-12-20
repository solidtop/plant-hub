import User from "@/types/User";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
});

const UserModel =
  mongoose.models.UserModel || mongoose.model<User>("UserModel", userSchema);

export default UserModel;
