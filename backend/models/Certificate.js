import mongoose from "mongoose"

const certificateSchema = new mongoose.Schema({

  title: { type: String, required: true },
  issuer: { type: String, default: "" },
  image: { type: String, default: "" },
  certificateUrl: { type: String, default: "" },
  issueDate: { type: Date },
  pinned: { type: Boolean, default: false },
  order: { type: Number, default: 0 }

}, {
  timestamps: true
})

export default mongoose.model(
  "Certificate",
  certificateSchema
)
