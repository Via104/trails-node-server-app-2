import mongoose from "mongoose";
// This is useful for the Community and Details page
const schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    trailId: String,
    name: String,
    city: String, 
    region: String,
    description: String,
    thumbnail: String,
  },
  { collection: "likes" }
);

export default schema;