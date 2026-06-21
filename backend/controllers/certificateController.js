import Certificate from "../models/Certificate.js"

export const getCertificates =
async (req,res)=>{

try{

const certificates=
await Certificate.find().sort({ pinned: -1, order: 1, createdAt: -1 })

res.json(certificates)

}

catch(error){

res.status(500)
.json({
message:error.message
})

}

}

export const getCertificateById =
async (req, res) => {

try {

const certificate =
await Certificate.findById(req.params.id)

if (!certificate) {
return res.status(404).json({ message: "Certificate not found" })
}

res.json(certificate)

}

catch (error) {

res.status(500)
.json({
message: error.message
})

}

}

export const createCertificate=
async(req,res)=>{

try{

const data = { ...req.body }
if (req.file) data.image = req.file.path

const certificate=
await Certificate.create(
data
)

res.status(201)
.json(certificate)

}

catch(error){

res.status(500)
.json({
message:error.message
})

}

}

export const deleteCertificate =
async(req,res)=>{

try{

await Certificate.findByIdAndDelete(
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

export const updateCertificate =
async(req,res)=>{

try{

const data = { ...req.body }
if (req.file) data.image = req.file.path

const certificate=
await Certificate.findByIdAndUpdate(

req.params.id,

data,

{
new:true
}

)

res.json(
certificate
)

}

catch(error){

res.status(500)
.json({
message:error.message
})

}

}
