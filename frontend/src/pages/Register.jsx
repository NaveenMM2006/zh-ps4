// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";

// const Register = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: "", email: "", password: "" });

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const { data } = await API.post("/auth/register", form);
//     alert("Registration successful! Please login.");
//     navigate("/login");
//   } catch (err) {
//     console.error(err);
//     alert(err.response?.data?.message || "Registration failed");
//   }
// };


//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form className="bg-white shadow p-6 rounded w-96" onSubmit={handleSubmit}>
//         <h2 className="text-2xl mb-4 font-bold">Register</h2>

//         <input className="w-full border p-2 mb-3" placeholder="Name"
//           onChange={(e) => setForm({ ...form, name: e.target.value })} />

//         <input className="w-full border p-2 mb-3" placeholder="Email"
//           onChange={(e) => setForm({ ...form, email: e.target.value })} />

//         <input type="password" className="w-full border p-2 mb-3"
//           placeholder="Password"
//           onChange={(e) => setForm({ ...form, password: e.target.value })} />

//         <button className="w-full bg-green-500 text-white p-2 rounded">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white shadow p-6 rounded w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 font-bold">Register</h2>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 mb-3"
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2 mb-3"
        />
        <button className="w-full bg-green-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
