// models/Upload.js
import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    latitude: Number,
    longitude: Number,
    image: String, // filename or URL
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    verified: { type: Boolean, default: false }, // NEW: verification flag
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin who verified
  },
  { timestamps: true }
);

export default mongoose.model("Upload", uploadSchema);
