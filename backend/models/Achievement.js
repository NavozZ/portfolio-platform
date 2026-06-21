import mongoose from "mongoose"

const achievementSchema = new mongoose.Schema({

  hackathonName: { type: String, required: true },
  details: { type: String, default: "" },
  certificateImage: { type: String, default: "" },
  certificateUrl: { type: String, default: "" },
  date: { type: Date },
  order: { type: Number, default: 0 }

}, {
  timestamps: true
})

export default mongoose.model(
  "Achievement",
  achievementSchema
)
