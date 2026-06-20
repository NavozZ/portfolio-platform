import mongoose from "mongoose"

const siteSettingsSchema = new mongoose.Schema({
  heroImage: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
})

siteSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne()
  if (!settings) {
    settings = await this.create({})
  }
  return settings
}

const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema)

export default SiteSettings
