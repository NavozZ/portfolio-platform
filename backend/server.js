import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import connectDB from "./config/db.js"
import projectRoutes from "./routes/projectRoutes.js"

dotenv.config()

connectDB()

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/projects", projectRoutes)

app.get("/",(req,res)=>{

res.json({
message:"Portfolio API Running"
})

})

const PORT=
process.env.PORT || 5000

app.listen(PORT,()=>{

console.log(
`Server Running ${PORT}`
)

})
