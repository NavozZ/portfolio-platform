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

const project=
await Project.create(
req.body
)

res.status(201)
.json(project)

}

catch(error){

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

const project=
await Project.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

)

res.json(
project
)

}

catch(error){

res.status(500)
.json({
message:error.message
})

}

}
