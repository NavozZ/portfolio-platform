import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import connectDB from "./config/db.js"
import projectRoutes from "./routes/projectRoutes.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()

connectDB()

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/projects", projectRoutes)
app.use("/api/auth", authRoutes)

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
