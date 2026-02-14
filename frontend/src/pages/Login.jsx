import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);

      // Save user in localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // Update context
      login(data);

      // Redirect based on role
      if (data.role === "admin") {
        navigate("/admin"); // Admin dashboard
      } else {
        navigate("/"); // Regular user homepage
      }
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded w-96">
        <h2 className="text-2xl mb-4 font-bold">Login</h2>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full border p-2 mb-3"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
