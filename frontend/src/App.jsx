import { Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import TaskDashboard from "./pages/TaskDashboard";
import toast, { Toaster } from "react-hot-toast";
function App() {
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
