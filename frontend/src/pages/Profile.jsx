// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await API.get("/users/profile");
      setProfile(data);
      const rewardRes = await API.get("/users/rewards");
      setRewards(rewardRes.data);
    };
    fetch();
  }, []);

  if (!profile) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Verified Uploads: {profile.uploadCount}</p>

      {rewards.length > 0 && (
        <div className="mt-4 bg-yellow-100 p-4 rounded">
          🎉 You earned Top Museum Ticket!
        </div>
      )}
    </div>
  );
};

export default Profile;
