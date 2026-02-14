// routes/adminRoutes.js
import express from "express";
import Upload from "../models/Upload.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all pending uploads
router.get("/uploads/pending", verifyAdmin, async (req, res) => {
  const pending = await Upload.find({ verified: false }).populate("uploader", "name email");
  res.json(pending);
});

// APPROVE an upload
router.put("/uploads/approve/:id", verifyAdmin, async (req, res) => {
  const upload = await Upload.findById(req.params.id);
  if (!upload) return res.status(404).json({ message: "Upload not found" });

  upload.verified = true;
  upload.verifiedBy = req.user.id;
  await upload.save();

  res.json({ message: "Upload verified successfully", upload });
});

// REJECT an upload
router.delete("/uploads/reject/:id", verifyAdmin, async (req, res) => {
  const upload = await Upload.findById(req.params.id);
  if (!upload) return res.status(404).json({ message: "Upload not found" });

  await upload.remove();
  res.json({ message: "Upload rejected successfully" });
});

export default router;
