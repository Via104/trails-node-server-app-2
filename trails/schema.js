import mongoose from "mongoose";
import { nanoid } from "nanoid";
import userSchema from "../users/schema.js";

const trailSchema = new mongoose.Schema(
  {
    trailId: { type: String, required: true, unique: true },
    name: String,
    // url: String,
    // length: Number,
    description: String,
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      unique: true,
      ref: "users",
    },
  },
  { collection: "trails" }
);

export default trailSchema;