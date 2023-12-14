import mongoose from "mongoose";

const likedTrailSchema = new mongoose.Schema(
  {
    trailId: { type: String, required: true, unique: true },
    name: String,
    city: String,
    region: String,
    description: String,
    thumbnail: String,
    count: {
      type: Number,
      default: 0,
    },
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "users",
    },

  },
  { collection: "likedTrails" }
);

export default likedTrailSchema;
