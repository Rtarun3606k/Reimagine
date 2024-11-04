import React, { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");

  const handelRegister = async (e) => {
    e.preventDefault();
    console.log(email);
    if (password !== ConfirmPassword) {
      //   alert("Password and Confirm Password must be same");
      toast.error("Password and Confirm Password must be same");
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        rePassword: ConfirmPassword,
        name: userName,
      }),
    };
    const response = await fetch(
      "http://localhost:3000/login_register/register",
      //   "http://localhost:3000/"
      options
    );
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      console.log(data);
      toast.success(data.message);
      setConfirmPassword("");
      setEmail("");
      setPassword("");
      setUserName("");
    } else {
      toast.error(data.error);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full"
      style={{ height: "79vh" }}
    >
      <form
        className="flex flex-col gap-4 hover:translate-y-1 ease-out duration-150"
        style={{
          background: "rgb(134 134 139 / 20%)",
          color: "rgb(134 134 139 / 90%)",
          width: "400px",
          padding: "20px",
          borderRadius: "10px",
        }}
        onSubmit={handelRegister}
      >
        <h1 className="flex justify-center text-2xl">Register</h1>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-lg h-8 text-center active:outline-none outline-none hover:outline-black hover:outline-opacity-50 hover:bg-transparent p-3"
            style={{
              background: "rgb(134 134 139 / 50%)",
              //   border: "1px solid #ccc",
              color: "#fff",
            }}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Name</label>
          <input
            type="text"
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-lg h-8 text-center active:outline-none outline-none hover:outline-black hover:outline-opacity-50"
            style={{
              background: "rgb(134 134 139 / 50%)",
              //   border: "1px solid #ccc",
              color: "#fff",
            }}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
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
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            required
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
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
          onClick={handelRegister}
          className="hover:bg-blue rounded-lg h-8 text-white bg-slate-700 transition-all duration-300 ease-in-out"
        >
          Register
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue underline hover:no-underline transition-all duration-150 ease-out"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
