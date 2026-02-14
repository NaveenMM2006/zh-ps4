import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">
        ChronicleMap
      </Link>

      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/upload">Upload</Link>
            <Link to="/profile">Profile</Link>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
