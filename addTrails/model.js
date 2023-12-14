import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("addTrails", schema);
export default model;
