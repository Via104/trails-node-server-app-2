import mongoose from "mongoose";

const trailSchema = new mongoose.Schema(
  {
    trailId: { type: String, required: true, unique: true },
    name: String,
    url: String,
    length: Number,
    description: String,
  },
  { collection: "trails" }
);

export default trailSchema;
