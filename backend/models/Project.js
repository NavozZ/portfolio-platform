import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({

  title: { type: String, required: true },
  category: { type: String, default: "" },
  thumbnail: { type: String, default: "" },
  description: { type: String, default: "" },
  longDescription: { type: String, default: "" },
  stack: [String],
  liveUrl: { type: String, default: "" },
  githubUrl: { type: String, default: "" },
  screenshots: [String],
  relatedReportUrl: { type: String, default: "" },
  order: { type: Number, default: 0 }

}, {
  timestamps: true
})

export default mongoose.model(
  "Project",
  projectSchema
)

