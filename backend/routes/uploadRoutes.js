// routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import Upload from "../models/Upload.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// --------------------
// Multer configuration
// --------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // Make sure 'uploads/' exists
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// --------------------
// POST /uploads
// --------------------
router.post("/", verifyUser, upload.single("image"), async (req, res) => {
  try {
    const { title, description, latitude, longitude } = req.body;

    // Validate coordinates
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (!lat || !lng) {
      return res.status(400).json({ message: "Valid coordinates are required" });
    }

    // Validate file
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Build full image URL
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // Create Upload document
    const newUpload = new Upload({
      title,
      description,
      latitude: lat,
      longitude: lng,
      image: imageUrl,
      uploader: req.user.id,
      verified: false, // initially unverified
      createdAt: new Date(), // timestamp for timeline
    });

    const savedUpload = await newUpload.save();

    res.status(201).json({
      message: "Upload submitted! Pending admin verification",
      upload: savedUpload,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------
// GET verified uploads
// For Explore page
// --------------------
router.get("/verified", async (req, res) => {
  try {
    const uploads = await Upload.find({ verified: true })
      .populate("uploader", "name") // include uploader's name
      .sort({ createdAt: -1 }); // newest first
    res.json(uploads);
  } catch (err) {
    console.error("Fetch verified uploads error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
