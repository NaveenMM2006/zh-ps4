// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";

const AdminDashboard = () => {
  const [uploads, setUploads] = useState([]);

  const fetchData = async () => {
    const { data } = await API.get("/admin/unverified");
    setUploads(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const verify = async (id) => {
    await API.put(`/admin/verify/${id}`);
    fetchData();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Verification</h2>

      {uploads.map((u) => (
        <div key={u._id} className="bg-white shadow p-4 mb-4 rounded">
          <h3 className="font-bold">{u.title}</h3>
          <button
            onClick={() => verify(u._id)}
            className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
          >
            Verify
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
