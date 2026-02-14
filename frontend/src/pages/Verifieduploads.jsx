// VerifiedUploads.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function VerifiedUploads() {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const fetchUploads = async () => {
      const { data } = await API.get("/uploads"); // only verified uploads
      setUploads(data);
    };
    fetchUploads();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Verified Uploads</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {uploads.map((u) => (
          <div key={u._id} className="border p-3 rounded shadow relative">
            <img src={`http://localhost:5000/uploads/${u.image}`} alt={u.title} className="w-full h-48 object-cover"/>
            <h2 className="font-bold mt-2">{u.title}</h2>
            <p className="text-sm">By: {u.uploader.name}</p>
            <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded">Verified</span>
          </div>
        ))}
      </div>
    </div>
  );
}
