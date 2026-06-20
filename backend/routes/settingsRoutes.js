import express from "express"
import { getHeroImage, updateHeroImage } from "../controllers/settingsController.js"

const router = express.Router()

router.get("/hero-image", getHeroImage)
router.put("/hero-image", updateHeroImage)

export default router
