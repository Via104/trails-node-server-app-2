import mongoose from "mongoose";
// This is useful for the Community and Details page
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