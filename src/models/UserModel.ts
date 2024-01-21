import mongoose, { Schema } from "mongoose";
import { User } from "@/types/user";

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
  plantIds: Array<Number>,
});

const UserModel =
  mongoose.models.UserModel || mongoose.model<User>("UserModel", userSchema);

export default UserModel;
