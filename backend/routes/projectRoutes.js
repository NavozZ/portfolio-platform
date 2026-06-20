import express from "express"

import {

getProjects,

getProjectById,

createProject,

deleteProject,

updateProject

}

from
"../controllers/projectController.js"

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
createProject
)

router.delete(
"/:id",
deleteProject
)

router.put(
"/:id",
updateProject
)

export default router

