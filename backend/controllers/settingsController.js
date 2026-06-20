import SiteSettings from "../models/SiteSettings.js"

export const getHeroImage = async (req, res) => {
  try {
    const settings = await SiteSettings.getSettings()
    res.json({ heroImage: settings.heroImage })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateHeroImage = async (req, res) => {
  try {
    const settings = await SiteSettings.getSettings()
    settings.heroImage = req.body.heroImage
    await settings.save()
    res.json({ message: "Hero image updated", heroImage: settings.heroImage })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
