import express from "express"
import { getHeroImage, updateHeroImage } from "../controllers/settingsController.js"
import { upload } from "../config/cloudinary.js"

const router = express.Router()

router.get("/hero-image", getHeroImage)
router.put("/hero-image", upload.single("heroImage"), updateHeroImage)

export default router
