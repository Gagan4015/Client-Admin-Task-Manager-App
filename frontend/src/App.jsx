import { Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import TaskDashboard from "./pages/TaskDashboard";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
function App() {
  useEffect(() => {
  axios.get("https://client-admin-task-manager-app-backend.onrender.com");
}, []);
  return (
    <div >
      <Toaster />
      
      <Routes>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/" element={<TaskDashboard></TaskDashboard>} />
      </Routes>
    </div>
  );
}

export default App;
