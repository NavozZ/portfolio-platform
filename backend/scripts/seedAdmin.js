import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import Admin from "../models/Admin.js"

// Load env vars
dotenv.config()

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")

        const email = process.env.ADMIN_EMAIL
        const password = process.env.ADMIN_PASSWORD

        if (!email || !password) {
            console.error("Please set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file")
            process.exit(1)
        }

        const existingAdmin = await Admin.findOne({ email })
        if (existingAdmin) {
            console.log(`Admin account for ${email} already exists.`)
            process.exit(0)
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const admin = new Admin({
            email,
            password: hashedPassword
        })

        await admin.save()
        console.log(`Admin account for ${email} created successfully.`)
        process.exit(0)
    } catch (error) {
        console.error("Error seeding admin:", error)
        process.exit(1)
    }
}

seedAdmin()
