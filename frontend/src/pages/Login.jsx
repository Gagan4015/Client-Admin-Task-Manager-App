import React, { useContext, useEffect, useState } from "react";
import { taskContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Login() {
  const { token, setToken, backendURL, navigate, user, setUser } =
    useContext(taskContext);
  const [currentState, setCurrentState] = useState("Login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "SignUp") {
        const response = await axios.post(backendURL + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);

          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendURL + "/api/auth/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);

          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          toast.success('Login Successfully!')

        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <div
    className="min-h-screen flex items-center justify-center 
bg-gradient-to-br from-blue-900 via-purple-900 to-black"
    >
   <form
  onSubmit={onSubmitHandler}
  className="mt-30 max-w-md 
  bg-white/10 backdrop-blur-xl 
  border border-white/20 
  shadow-2xl shadow-black/30
  rounded-3xl p-10
  flex flex-col items-center 
  w-[90%] sm:max-w m-auto gap-5
  text-white"
>
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
        Client Task Dashboard
      </h1>
      <div className="inline-flex items-center gap-2 mb-2 mt-2">
        <p className="prata-regular text-3xl ">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-black" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          className="w-full px-4 py-2 
bg-white/20 backdrop-blur-md 
border border-white/30 
rounded-lg 
placeholder-gray-200 
text-white 
focus:outline-none 
focus:ring-2 focus:ring-purple-400"
          placeholder="Name"
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      )}
      <input
className="w-full px-4 py-2 
bg-white/20 backdrop-blur-md 
border border-white/30 
rounded-lg 
placeholder-gray-200 
text-white 
focus:outline-none 
focus:ring-2 focus:ring-purple-400"        placeholder="Email"
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
className="w-full px-4 py-2 
bg-white/20 backdrop-blur-md 
border border-white/30 
rounded-lg 
placeholder-gray-200 
text-white 
focus:outline-none 
focus:ring-2 focus:ring-purple-400"        placeholder="Password"
        type="password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="w-full flex justify-between text-sm -mt-2">
        <p className="cursor-pointer">Forgot Your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("SignUp")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button className="cursor-pointer bg-black text-white font-light px-8 py-2 mt-4">
        {currentState}
      </button>
    </form>
    </div>
  );
}
