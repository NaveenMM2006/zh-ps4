import Upload from "../models/Upload.js";
import Reward from "../models/Reward.js";

// GET USER PROFILE
export const getProfile = async (req, res) => {
  res.json(req.user);
};

// GET USER UPLOADS
export const getMyUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({ uploadedBy: req.user._id });
    res.json(uploads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER REWARDS
export const getMyRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({ user: req.user._id });
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
