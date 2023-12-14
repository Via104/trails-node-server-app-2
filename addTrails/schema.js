import mongoose from "mongoose";

const addTrailSchema = new mongoose.Schema(
  {
    trailId: { type: String, required: true, unique: true },
    name: String,
    url: String,
    length: Number,
    description: String,
  },
  { collection: "addTrails" }
);

export default addTrailSchema;
