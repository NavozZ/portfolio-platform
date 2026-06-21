import express from "express"

import {

getAchievements,

getAchievementById,

createAchievement,

deleteAchievement,

updateAchievement

}

from
"../controllers/achievementController.js"

import { upload } from "../config/cloudinary.js"

const router=
express.Router()

router.get(
"/",
getAchievements
)

router.get(
"/:id",
getAchievementById
)

router.post(
"/",
upload.single("certificateImage"),
createAchievement
)

router.delete(
"/:id",
deleteAchievement
)

router.put(
"/:id",
upload.single("certificateImage"),
updateAchievement
)

export default router
