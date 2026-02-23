import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/taskController.js";
import jwtUserAuth from "../middleware/jwtUserAuth.js";

const taskRoute = express.Router();

taskRoute.get("/", jwtUserAuth, getTask);
taskRoute.post("/", jwtUserAuth, createTask);
taskRoute.put("/:id", jwtUserAuth, updateTask);
taskRoute.delete("/:id", jwtUserAuth, deleteTask);

export default taskRoute;
