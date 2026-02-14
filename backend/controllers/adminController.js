import Upload from "../models/Upload.js";
import User from "../models/User.js";
import Reward from "../models/Reward.js";

// GET UNVERIFIED UPLOADS
export const getUnverifiedUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({ isVerified: false })
      .populate("uploadedBy", "name email");
    res.json(uploads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// VERIFY UPLOAD
export const verifyUpload = async (req, res) => {
  try {
    const upload = await Upload.findById(req.params.id);

    if (!upload)
      return res.status(404).json({ message: "Upload not found" });

    if (upload.isVerified)
      return res.status(400).json({ message: "Already verified" });

    upload.isVerified = true;
    upload.verifiedBy = req.user._id;
    await upload.save();

    // Increase user's upload count
    const user = await User.findById(upload.uploadedBy);
    user.uploadCount += 1;
    await user.save();

    // Reward logic
    if (user.uploadCount === 250) {
      await Reward.create({ user: user._id });
    }

    res.json({ message: "Upload verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
