// import { useState } from "react";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix Leaflet default marker issue in Vite
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// // Component for handling click events on the map
// function ClickMarker({ setSelected }) {
//   useMapEvents({
//     click(e) {
//       setSelected(e.latlng);
//     },
//   });
//   return null;
// }

// // Main Upload Component
// export default function Upload() {
//   const [selected, setSelected] = useState(null); // Selected coordinates
//   const [search, setSearch] = useState(""); // Search input
//   const [image, setImage] = useState(null); // Uploaded image
//   const [title, setTitle] = useState(""); // Title
//   const [description, setDescription] = useState(""); // Description

//   // Search for location using Nominatim API
//   const handleSearch = async () => {
//     if (!search) return;
//     try {
//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//           search
//         )}&format=json&limit=1`
//       );
//       const data = await res.json();
//       if (data && data.length > 0) {
//         const { lat, lon } = data[0];
//         setSelected({ lat: parseFloat(lat), lng: parseFloat(lon) });
//       } else {
//         alert("Location not found!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error searching location");
//     }
//   };

//   // Form submission handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selected) return alert("Please select a location on the map or via search!");
//     if (!image || !title) return alert("Please provide an image and title!");

//     // Create FormData for backend
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("latitude", selected.lat);
//     formData.append("longitude", selected.lng);
//     formData.append("image", image);

//     try {
//       const token = localStorage.getItem("token"); // JWT token stored from login
//       const res = await fetch("http://localhost:5000/api/uploads", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("Upload submitted! Pending admin verification.");
//         // Reset form
//         setTitle("");
//         setDescription("");
//         setImage(null);
//         setSelected(null);
//         setSearch("");
//       } else {
//         alert(data.message || "Upload failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
//         <h1 className="text-xl font-bold text-indigo-600">ChronicleMap</h1>
//       </nav>

//       <div className="flex flex-col md:flex-row flex-1 p-6 gap-6">
//         {/* Form Section */}
//         <div className="md:w-1/3 bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-bold mb-4">Contribute History</h2>

//           {/* Location Search */}
//           <div className="mb-4">
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search for a place..."
//               className="w-full border px-3 py-2 rounded-lg mb-2"
//             />
//             <button
//               onClick={handleSearch}
//               type="button"
//               className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
//             >
//               Search Location
//             </button>
//           </div>

//           {/* Upload Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full border px-3 py-2 rounded-lg"
//               required
//             />
//             <textarea
//               placeholder="Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full border px-3 py-2 rounded-lg"
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImage(e.target.files[0])}
//               className="w-full"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
//             >
//               Submit Upload
//             </button>
//           </form>

//           {/* Display selected coordinates */}
//           {selected && (
//             <p className="mt-4 text-gray-700">
//               Selected Coordinates: {selected.lat.toFixed(5)}, {selected.lng.toFixed(5)}
//             </p>
//           )}
//         </div>

//         {/* Map Section */}
//         <div className="md:flex-1 h-[500px] rounded-xl overflow-hidden shadow">
//           <MapContainer
//             center={[28.6139, 77.209]}
//             zoom={13}
//             className="h-full w-full"
//           >
//             <TileLayer
//               attribution="&copy; OpenStreetMap contributors"
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <ClickMarker setSelected={setSelected} />
//             {selected && <Marker position={[selected.lat, selected.lng]} />}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default marker issue in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Click handler for selecting coordinates
function ClickMarker({ setSelected }) {
  useMapEvents({
    click(e) {
      setSelected(e.latlng);
    },
  });
  return null;
}

export default function Upload() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSearch = async () => {
    if (!search) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          search
        )}&format=json&limit=1`
      );
      const data = await res.json();
      if (data?.length > 0) {
        const { lat, lon } = data[0];
        setSelected({ lat: parseFloat(lat), lng: parseFloat(lon) });
      } else {
        alert("Location not found!");
      }
    } catch (err) {
      console.error(err);
      alert("Error searching location");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected) return alert("Please select a location on the map or via search!");
    if (!image || !title) return alert("Please provide an image and title!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("latitude", selected.lat);
    formData.append("longitude", selected.lng);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You must be logged in to upload!");

      const res = await fetch("http://localhost:5000/api/uploads", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Upload submitted! Pending admin verification.");
        setTitle("");
        setDescription("");
        setImage(null);
        setSelected(null);
        setSearch("");
      } else if (res.status === 401) {
        alert("Unauthorized! Please log in again.");
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold text-indigo-600">ChronicleMap</h1>
      </nav>

      <div className="flex flex-col md:flex-row flex-1 p-6 gap-6">
        <div className="md:w-1/3 bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Contribute History</h2>

          <div className="mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a place..."
              className="w-full border px-3 py-2 rounded-lg mb-2"
            />
            <button
              onClick={handleSearch}
              type="button"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Search Location
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Submit Upload
            </button>
          </form>

          {selected && (
            <p className="mt-4 text-gray-700">
              Selected Coordinates: {selected.lat.toFixed(5)}, {selected.lng.toFixed(5)}
            </p>
          )}
        </div>

        <div className="md:flex-1 h-[500px] rounded-xl overflow-hidden shadow">
          <MapContainer center={[28.6139, 77.209]} zoom={13} className="h-full w-full">
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png" // More reliable dev server
            />
            <ClickMarker setSelected={setSelected} />
            {selected && <Marker position={[selected.lat, selected.lng]} />}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
