import mongoose from "mongoose";
const schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    trailId: String,
    title: String,
    description: String
  },
  { collection: "likes" }
);

export default schema;