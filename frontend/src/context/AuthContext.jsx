import { Children, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const taskContext = createContext();

export default function AuthContext({ children }) {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
     const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (storedToken) {
    setToken(storedToken);
  }

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
  }, []);

  const value = {
    token,
    setToken,
    backendURL,
    navigate,
    user,
    setUser,
  };
  return (
    <div>
      <taskContext.Provider value={value}>{children}</taskContext.Provider>
    </div>
  );
}
