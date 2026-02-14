// routes/userRoutes.js
import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import { getProfile, getMyUploads, getMyRewards } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", verifyUser, getProfile);
router.get("/uploads", verifyUser, getMyUploads);
router.get("/rewards", verifyUser, getMyRewards);

export default router;
