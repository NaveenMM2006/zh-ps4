// // AdminPanel.jsx
// import { useEffect, useState } from "react";
// import API from "../api/axios";

// export default function AdminPanel() {
//   const [pending, setPending] = useState([]);

//   const fetchPending = async () => {
//     const { data } = await API.get("/admin/uploads/pending");
//     setPending(data);
//   };

//   useEffect(() => {
//     fetchPending();
//   }, []);

//   const approve = async (id) => {
//     await API.put(`/admin/uploads/approve/${id}`);
//     fetchPending();
//   };

//   const reject = async (id) => {
//     await API.delete(`/admin/uploads/reject/${id}`);
//     fetchPending();
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Pending Uploads</h1>
//       {pending.length === 0 && <p>No pending uploads</p>}
//       {pending.map((upload) => (
//         <div key={upload._id} className="border p-3 mb-3 rounded">
//           <h2 className="font-bold">{upload.title}</h2>
//           <p>By: {upload.uploader.name}</p>
//           <img src={`http://localhost:5000/uploads/${upload.image}`} alt="" className="h-32 w-auto mt-2"/>
//           <div className="mt-2">
//             <button onClick={() => approve(upload._id)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Approve</button>
//             <button onClick={() => reject(upload._id)} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function AdminPanel() {
  const [pending, setPending] = useState([]);

  // Fetch pending uploads from backend
  const fetchPending = async () => {
    try {
      const { data } = await API.get("/admin/uploads/pending");
      setPending(data);
    } catch (err) {
      console.error("Error fetching pending uploads:", err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  // Approve an upload
  const approve = async (id) => {
    try {
      await API.put(`/admin/uploads/approve/${id}`);
      fetchPending(); // Refresh list
    } catch (err) {
      console.error("Approve failed:", err.response?.data || err);
    }
  };

  // Reject an upload
  const reject = async (id) => {
    try {
      await API.delete(`/admin/uploads/reject/${id}`);
      fetchPending(); // Refresh list
    } catch (err) {
      console.error("Reject failed:", err.response?.data || err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Uploads</h1>
      {pending.length === 0 && <p>No pending uploads</p>}

      {pending.map((upload) => (
        <div key={upload._id} className="border p-3 mb-3 rounded shadow">
          <h2 className="font-bold text-lg">{upload.title}</h2>
          <p>By: {upload.uploader.name} ({upload.uploader.email})</p>
          <p className="text-sm text-gray-500">
            Uploaded: {new Date(upload.createdAt).toLocaleString()}
          </p>
          <img
            src={upload.image} // This should be full URL from backend
            alt={upload.title}
            className="h-32 w-auto mt-2 rounded"
          />
          <div className="mt-2">
            <button
              onClick={() => approve(upload._id)}
              className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
            >
              Approve
            </button>
            <button
              onClick={() => reject(upload._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
