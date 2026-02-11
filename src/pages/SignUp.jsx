import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import bgImage from "../assets/images/bg3.jpg";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        contact: form.contact,
      }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message);

    alert("Signup successful");
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center brightness-90 contrast-125"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/90 p-6 sm:p-8 rounded-2xl shadow-lg w-[90%] max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <input
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <input
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <input
            name="contact"
            placeholder="Contact Number"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirm"
              placeholder="Confirm Password"
              required
              onChange={handleChange}
              className={`w-full p-3 border rounded-xl ${
                form.confirm && form.confirm !== form.password
                  ? "border-red-500"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-3"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button className="w-full bg-black text-white p-3 rounded-xl font-semibold">
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
