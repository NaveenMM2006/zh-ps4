import { useEffect, useState } from "react";
import API from "../api/axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue in Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Dashboard = () => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const fetchUploads = async () => {
      const { data } = await API.get("/uploads");
      setUploads(data);
    };
    fetchUploads();
  }, []);

  return (
    <div className="h-[90vh]">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {uploads.map((u) => (
          <Marker key={u._id} position={[u.location.lat, u.location.lng]}>
            <Popup>
              <h3 className="font-bold">{u.title}</h3>
              <img
                src={`http://localhost:5000${u.mediaUrl}`}
                className="w-40 mt-2"
              />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Dashboard;
