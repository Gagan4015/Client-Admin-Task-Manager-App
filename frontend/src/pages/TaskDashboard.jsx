import { useEffect, useContext, useState } from "react";
import { taskContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function TaskDashboard() {
  const { token, setToken, backendURL, navigate, user, setUser } =
    useContext(taskContext);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchTask = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    const response = await axios.get(backendURL + "/api/tasks/", {
      headers: { token },
    });
    setTasks(response.data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await axios.post(
        backendURL + "/api/tasks/",
        { title: newTask },
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setNewTask("");
        fetchTask();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateTask = async (id) => {
    const editTask = prompt("Edit Task");
    if (!editTask) return;

    const response = await axios.put(
      backendURL + `/api/tasks/${id}`,
      { title: editTask },
      { headers: { token } },
    );

    if (response.data.success) {
      toast.success(response.data.message);
      fetchTask();
    } else {
      toast.error(response.data.message);
    }
  };

  const deleteTask = async (id) => {
    const response = await axios.delete(backendURL + `/api/tasks/${id}`, {
      headers: { token },
    });

    if (response.data.success) {
      toast.success(response.data.message);
      fetchTask();
    } else {
      toast.error(response.data.message);
    }
  };

  const toggleTask = async (task) => {
    try {
      const newStatus = task.status === "pending" ? "completed" : "pending";

      const response = await axios.put(
        backendURL + `/api/tasks/${task._id}`,
        {
          title: task.title,
          status: newStatus,
        },
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchTask();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
    toast.success("LogOut Successfully!");
  };

  useEffect(() => {
    fetchTask();
  }, [token]);

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

 return (
  <div
    className="min-h-screen flex justify-center items-start pt-10 sm:pt-20
    bg-gradient-to-br from-blue-900 via-purple-900 to-black px-4"
  >
    <div
      className="p-5 sm:p-8 max-w-2xl w-full
      bg-white/10 backdrop-blur-xl
      border border-white/20
      shadow-2xl shadow-black/40
      rounded-2xl sm:rounded-3xl text-white"
    >
      {/* Heading */}
      <h1
        className="text-2xl sm:text-4xl font-bold mb-4
        bg-gradient-to-r from-purple-400 to-blue-400
        bg-clip-text text-transparent text-center sm:text-left"
      >
        Tasks
      </h1>

      {/* Welcome + Logout */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <strong className="text-center sm:text-left">
          Welcome {user?.name}
        </strong>

        <button
          onClick={signOut}
          className="w-full sm:w-auto px-4 py-2 rounded-lg
          bg-red-500/80 hover:bg-red-600
          transition duration-300 text-white"
        >
          Logout
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-6">
        {["all", "pending", "completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg backdrop-blur-md transition text-sm sm:text-base
            ${
              filter === type
                ? "bg-purple-500 text-white"
                : "bg-white/20 hover:bg-white/30"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Add Task */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          className="w-full px-4 py-2
          bg-white/20 backdrop-blur-md
          border border-white/30
          rounded-lg
          placeholder-gray-200
          text-white
          focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Enter task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button
          onClick={addTask}
          className="w-full sm:w-auto
          bg-gradient-to-r from-purple-500 to-blue-500
          hover:scale-105 transition duration-300
          text-white px-4 py-2 rounded-lg shadow-lg"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <p className="text-gray-300 text-center">No tasks found</p>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task._id}
            className="bg-white/10 backdrop-blur-lg
            border border-white/20
            p-4 rounded-2xl mb-4
            flex flex-col sm:flex-row sm:justify-between sm:items-center
            gap-4 shadow-lg"
          >
            <div>
              <p className="font-medium text-sm sm:text-base">
                {task.title} —{" "}
                <span
                  className={
                    task.status === "completed"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                >
                  {task.status}
                </span>
              </p>

              {user?.role === "admin" && task.user && (
                <span className="text-xs sm:text-sm text-gray-300">
                  User: {task.user.name} ({task.user.email})
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleTask(task)}
                className="flex-1 sm:flex-none
                bg-gray-500/70 hover:bg-gray-600
                px-3 py-1 rounded-lg transition text-sm"
              >
                Toggle
              </button>

              <button
                onClick={() => updateTask(task._id)}
                className="flex-1 sm:flex-none
                bg-yellow-500/80 hover:bg-yellow-600
                px-3 py-1 rounded-lg transition text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                className="flex-1 sm:flex-none
                bg-red-500/80 hover:bg-red-600
                px-3 py-1 rounded-lg transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
}
