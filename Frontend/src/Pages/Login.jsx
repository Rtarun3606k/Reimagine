import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handelLogin = async (e) => {
    e.preventDefault();
    console.log(email);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    const response = await fetch(
      "http://localhost:3000/login_register/login",
      //   "http://localhost:3000/"
      options
    );
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      console.log(data);
      toast.success(data.message);
      setEmail("");
      setPassword("");
    } else {
      toast.error(data.error);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full"
      style={{ height: "69vh" }}
    >
      <form
        action="post"
        className="flex flex-col gap-4"
        style={{
          background: "rgb(134 134 139 / 20%)",
          color: "rgb(134 134 139 / 90%)",
          width: "300px",
          padding: "20px",
          borderRadius: "10px",
        }}
        onSubmit={handelLogin}
      >
        <h1 className="flex justify-center text-2xl">Login</h1>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-lg h-8 text-center active:outline-none outline-none hover:outline-black hover:outline-opacity-50"
            style={{
              background: "rgb(134 134 139 / 50%)",
              //   border: "1px solid #ccc",
              color: "#fff",
            }}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            required
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-lg h-8 text-center active:outline-none outline-none hover:outline-black hover:outline-opacity-50"
            style={{
              background: "rgb(134 134 139 / 50%)",
              //   border: "1px solid #ccc",
              color: "#fff",
            }}
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <input
            type="checkbox"
            name=""
            id="checkbox"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            style={{
              accentColor: "rgb(134 134 139 / 50%)",
              backgroundColor: "transparent",
              //   border: "1px solid #ccc",
              color: "#fff",
            }}
          />
          <label htmlFor="checkbox">
            {showPassword ? "Hide Password" : "Show Password"}
          </label>
        </div>
        <button
          type="submit"
          className="hover:bg-blue rounded-lg h-8 text-white bg-slate-700 transition-all duration-300 ease-in-out"
        >
          Login
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue underline hover:no-underline transition-all duration-150 ease-out"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
