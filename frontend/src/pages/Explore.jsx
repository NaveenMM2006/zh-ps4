import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default marker icon in Vite/React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Explore() {
  const [uploads, setUploads] = useState([]);

  // Fetch verified uploads
  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/uploads/verified");
        const data = await res.json();
        setUploads(data);
      } catch (err) {
        console.error("Failed to fetch uploads:", err);
      }
    };
    fetchUploads();
  }, []);

  return (
    <div className="h-screen w-full">
      <MapContainer center={[28.6139, 77.209]} zoom={5} className="h-full w-full">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {uploads.map((upload) => (
          <Marker key={upload._id} position={[upload.latitude, upload.longitude]}>
            <Popup>
              <div className="w-48">
                <h3 className="font-bold">{upload.title}</h3>
                <p className="text-sm">{upload.description}</p>
                <p className="text-xs text-gray-500">By: {upload.uploader.name}</p>
                <img
                  src={upload.image}
                  alt={upload.title}
                  className="mt-2 w-full h-24 object-cover rounded"
                />
                <p className="text-xs text-gray-400">
                  {new Date(upload.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
