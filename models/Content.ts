import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    summary: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Content ||
  mongoose.model("Content", ContentSchema);
