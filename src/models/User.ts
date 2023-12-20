import mongoose, { Schema } from "mongoose";

type UserModel = {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

const userSchema = new Schema<UserModel>({
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

const User =
  mongoose.models.User || mongoose.model<UserModel>("User", userSchema);

export default User;
