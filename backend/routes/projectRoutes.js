import express from "express"

import {

getProjects,

getProjectById,

createProject,

deleteProject,

updateProject,

reorderProjects

}

from
"../controllers/projectController.js"

import { upload } from "../config/cloudinary.js"

const router=
express.Router()

router.get(
"/",
getProjects
)

router.get(
"/:id",
getProjectById
)

router.post(
"/",
upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "screenshots", maxCount: 10 }]),
createProject
)

router.delete(
"/:id",
deleteProject
)

router.put(
"/reorder",
reorderProjects
)

router.put(
"/:id",
upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "screenshots", maxCount: 10 }]),
updateProject
)

export default router

