import mongoose from "mongoose";
const rewardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rewardType: {
      type: String,
      default: "Top Museum Ticket",
    },
  },
  { timestamps: true }
);
const reward  = mongoose.model("Reward", rewardSchema);
export default reward;
