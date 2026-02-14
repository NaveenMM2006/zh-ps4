🚀 ChronicleMap – MERN Authentication App

ChronicleMap is a full-stack MERN authentication application featuring secure JWT cookie-based login, signup, profile management, and protected routes. It uses modern tools like React + Tailwind CSS on the frontend and Node.js + Express + MongoDB on the backend, with Zustand for state management.

✨ Features

🔐 JWT Authentication using HTTP-only cookies

📝 Signup & Login

👤 Profile Page (view + update profile picture)

🚪 Logout functionality

🧠 Zustand for global auth state

🎨 Tailwind CSS modern UI

🔄 Auto redirect after login

🛡 Protected routes

🍪 Cookie-based auth (no localStorage tokens)

🛠 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Zustand

Axios

React Router DOM

Backend

Node.js

Express.js

MongoDB

JWT

bcrypt

📁 Project Structure
frontend/
  src/
    pages/
    store/
    lib/
    components/

backend/
  controllers/
  routes/
  models/
  middleware/

⚙️ Environment Variables (Backend)

Create a .env file in backend root:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

▶️ How to Run Locally
1️⃣ Backend
cd backend
npm install
npm run dev


Server runs on:

http://localhost:3000

2️⃣ Frontend
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔑 Authentication Flow

User logs in / signs up

Backend creates JWT and stores it in HTTP-only cookie

Frontend calls /auth/check to verify user

Zustand stores user globally

Navbar + Profile update automatically

Logout clears cookie

No tokens stored in localStorage — fully secure.

📸 Pages Included

Login

Signup

Home

Profile

Protected Routes

🧪 API Endpoints
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/check
PUT    /api/auth/update-profile

✅ Future Improvements

Upload profile image instead of URL

Change password

Email verification

Admin roles

Dashboard

Socket integration

👨‍💻 Author

Built with ❤️ using MERN stack.
