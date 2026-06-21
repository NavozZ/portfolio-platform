import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import Admin from "../models/Admin.js"

export const login=
async(req,res)=>{

const {
email,
password
}=req.body

try {
    const admin = await Admin.findOne({ email })
    if (!admin) {
        return res.status(401).json({ message:"Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
        return res.status(401).json({ message:"Invalid credentials" })
    }

    const token=
    jwt.sign(
    {
    role:"admin"
    },
    process.env.JWT_SECRET,
    {
    expiresIn:"1d"
    }
    )

    return res.json({
    token
    })

} catch (error) {
    console.error("Login error:", error)
    return res.status(500).json({ message:"Server error" })
}

}
