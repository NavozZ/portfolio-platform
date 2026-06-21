import express from "express"

import {

getCertificates,

getCertificateById,

createCertificate,

deleteCertificate,

updateCertificate

}

from
"../controllers/certificateController.js"

import { upload } from "../config/cloudinary.js"

const router=
express.Router()

router.get(
"/",
getCertificates
)

router.get(
"/:id",
getCertificateById
)

router.post(
"/",
upload.single("image"),
createCertificate
)

router.delete(
"/:id",
deleteCertificate
)

router.put(
"/:id",
upload.single("image"),
updateCertificate
)

export default router
