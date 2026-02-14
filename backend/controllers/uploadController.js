import Upload from "../models/Upload.js";

// CREATE UPLOAD
export const createUpload = async (req, res) => {
  try {
    const { title, description, mediaType, lat, lng, address } = req.body;

    const upload = await Upload.create({
      title,
      description,
      mediaType,
      mediaUrl: `/uploads/${req.file.filename}`,
      location: {
        lat,
        lng,
        address,
      },
      uploadedBy: req.user._id,
    });

    res.status(201).json(upload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL VERIFIED UPLOADS
export const getUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({ isVerified: true })
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 });

    res.json(uploads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
