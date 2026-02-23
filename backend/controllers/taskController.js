import taskModel from "../models/taskModel.js";

export const getTask = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "admin") {
      tasks = await taskModel.find().populate("user", "name email");
    } else {
      tasks = await taskModel.find({ user: req.user.id });
    }

    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || title.length < 1) {
      return res.json({ message: "Title is required" });
    }
    const task = await taskModel.create({
      title,
      status: "pending",
      user: req.user.id,
    });

    res.json({ success: true, message: "task Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;

    const task = await taskModel.findById(id);

    if (!task) {
      return res.json({ success: false, message: "Task not found" });
    }

    // Check ownership Allow if admin OR owner

    if (req.user.role !== "admin" && task.user.toString() !== req.user.id) {
      return res.json({ success: false, message: "Not authorized" });
    }
    // if empty task
    if (!title || title.length < 1) {
      return res.json({ success: false, message: "Title is required" });
    }

    // update
    if (title !== undefined) task.title = title;
    if (status !== undefined) task.status = status;

    const updatedTask = await task.save();
    res.json({ success: true, message: "Task upDated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.json({ success: false, message: "Only Amin can delete" });
  }

  await taskModel.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Task Deleted" });
};
