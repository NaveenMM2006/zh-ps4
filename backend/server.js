import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

// CONNECT DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // CREATE DEFAULT ADMIN
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Admin",
        email: "admin@chroniclemap.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Default Admin Created");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Database connection failed:", err.message));
