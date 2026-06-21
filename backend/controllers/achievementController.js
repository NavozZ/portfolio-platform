import Achievement from "../models/Achievement.js"

export const getAchievements =
async (req,res)=>{

try{

const achievements=
await Achievement.find().sort({ order: 1, createdAt: -1 })

res.json(achievements)

}

catch(error){

res.status(500)
.json({
message:error.message
})

}

}

export const getAchievementById =
async (req, res) => {

try {

const achievement =
await Achievement.findById(req.params.id)

if (!achievement) {
return res.status(404).json({ message: "Achievement not found" })
}

res.json(achievement)

}

catch (error) {

res.status(500)
.json({
message: error.message
})

}

}

export const createAchievement=
async(req,res)=>{

try{

const data = { ...req.body }
if (req.file) data.certificateImage = req.file.path

if (data.date === "") data.date = undefined
if (data.order === "" || data.order === undefined) data.order = 0

const achievement=
await Achievement.create(
data
)

res.status(201)
.json(achievement)

}

catch(error){
console.error("Achievement create error:", error)
res.status(500)
.json({
message:error.message
})

}

}

export const deleteAchievement =
async(req,res)=>{

try{

await Achievement.findByIdAndDelete(
req.params.id
)

res.json({
message:"Deleted"
})

}

catch(error){

res.status(500)
.json({
message:error.message
})

}

}

export const updateAchievement =
async(req,res)=>{

try{

const data = { ...req.body }
if (req.file) data.certificateImage = req.file.path

if (data.date === "") data.date = undefined
if (data.order === "" || data.order === undefined) data.order = 0

const achievement=
await Achievement.findByIdAndUpdate(

req.params.id,

data,

{
new:true
}

)

res.json(
achievement
)

}

catch(error){
console.error("Achievement update error:", error)
res.status(500)
.json({
message:error.message
})

}

}
