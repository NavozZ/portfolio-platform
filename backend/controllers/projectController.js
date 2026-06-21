import Project from "../models/Project.js"

export const getProjects =
async (req,res)=>{

try{

const projects=
await Project.find().sort({ order: 1, createdAt: -1 })

res.json(projects)

}

catch(error){

res.status(500)
.json({
message:error.message
})

}

}

export const getProjectById =
async (req, res) => {

try {

const project =
await Project.findById(req.params.id)

if (!project) {
return res.status(404).json({ message: "Project not found" })
}

res.json(project)

}

catch (error) {

res.status(500)
.json({
message: error.message
})

}

}

export const createProject=
async(req,res)=>{

try{

const data = { ...req.body }

if (req.files) {
  if (req.files.thumbnail && req.files.thumbnail.length > 0) {
    data.thumbnail = req.files.thumbnail[0].path
  }
  if (req.files.screenshots && req.files.screenshots.length > 0) {
    data.screenshots = req.files.screenshots.map(file => file.path)
  }
}

if (data.order === "" || data.order === undefined) data.order = 0

const project=
await Project.create(
data
)

res.status(201)
.json(project)

}

catch(error){
console.error("Project create error:", error)
res.status(500)
.json({
message:error.message
})

}

}

export const deleteProject =
async(req,res)=>{

try{

await Project.findByIdAndDelete(
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

export const updateProject =
async(req,res)=>{

try{

const data = { ...req.body }

if (req.files) {
  if (req.files.thumbnail && req.files.thumbnail.length > 0) {
    data.thumbnail = req.files.thumbnail[0].path
  }
  if (req.files.screenshots && req.files.screenshots.length > 0) {
    data.screenshots = req.files.screenshots.map(file => file.path)
  }
}

if (data.order === "" || data.order === undefined) data.order = 0

const project=
await Project.findByIdAndUpdate(

req.params.id,

data,

{
new:true
}

)

res.json(
project
)

}

catch(error){
console.error("Project update error:", error)
res.status(500)
.json({
message:error.message
})

}

}
