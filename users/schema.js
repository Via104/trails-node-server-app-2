import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    role: {
      type: String,
      enum: ["REGULAR", "ADMIN"],
      default: "REGULAR",
    },
    favourites: {
      type: [Object],
      unique: true,
      required: false,
    },
  },
  { collection: "users" }
);
export default userSchema;
