import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title: String,
    status: { type: String, default: "pending" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

 const taskModel = mongoose.model("Task", taskSchema);
export default taskModel

