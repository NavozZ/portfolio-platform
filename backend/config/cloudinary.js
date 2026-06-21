import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

if (process.env.NODE_ENV !== "production") {
  console.log("Cloudinary Config Check:")
  console.log("  - cloud_name defined:", !!process.env.CLOUDINARY_CLOUD_NAME)
  console.log("  - api_key defined:", !!process.env.CLOUDINARY_API_KEY)
  console.log("  - api_secret defined:", !!process.env.CLOUDINARY_API_SECRET)
}

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "svg"]
  }
})

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
})

export default cloudinary
