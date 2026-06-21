import "dotenv/config"
import express from "express"
import cors from "cors"

import connectDB from "./config/db.js"
import projectRoutes from "./routes/projectRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import settingsRoutes from "./routes/settingsRoutes.js"
import certificateRoutes from "./routes/certificateRoutes.js"
import achievementRoutes from "./routes/achievementRoutes.js"

connectDB()

const app = express()

app.use(cors())

app.use(express.json({ limit: "2mb" }))

app.use("/api/projects", projectRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/settings", settingsRoutes)
app.use("/api/certificates", certificateRoutes)
app.use("/api/achievements", achievementRoutes)

app.get("/",(req,res)=>{

res.json({
message:"Portfolio API Running"
})

})

app.get(
"/health",
(req,res)=>{

res.status(200)

.json({

status:
"healthy"

})

}
)

const PORT=
process.env.PORT || 5000

app.listen(PORT,()=>{

console.log(
`Server Running ${PORT}`
)

})
