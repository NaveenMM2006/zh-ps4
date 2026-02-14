import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-indigo-600">
          ChronicleMap
        </h1>

        <div className="space-x-6">
          <Link to="/explore" className="text-gray-700 hover:text-indigo-600">
            Explore
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-indigo-600">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Join
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 mt-24">
        <h2 className="text-5xl font-extrabold text-gray-800 leading-tight">
          Preserving Stories.
          <br />
          Mapping History.
        </h2>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          ChronicleMap empowers communities to preserve local history by
          connecting photos, documents, and stories directly to places on a map.
        </p>

        <div className="mt-10 space-x-6">
          <Link
            to="/explore"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-indigo-700"
          >
            Explore Map
          </Link>

          <Link
            to="/upload"
            className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg text-lg hover:bg-indigo-50"
          >
            Contribute History
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-32 px-8 grid md:grid-cols-3 gap-10 text-center">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-indigo-600">
            Crowdsourced Preservation
          </h3>
          <p className="mt-4 text-gray-600">
            Community members upload and digitize historical materials.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-indigo-600">
            Geospatial Storytelling
          </h3>
          <p className="mt-4 text-gray-600">
            Discover stories by exploring neighborhoods and landmarks.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-indigo-600">
            Multimedia Archive
          </h3>
          <p className="mt-4 text-gray-600">
            Photos, documents, audio recordings — layered in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
