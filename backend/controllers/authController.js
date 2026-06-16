import jwt from "jsonwebtoken"

export const login=
async(req,res)=>{

const {

email,
password

}=req.body

if(

email==="admin@gmail.com"

&&

password==="123456"

){

const token=

jwt.sign(

{
role:"admin"
},

"SECRET_KEY",

{
expiresIn:"1d"
}

)

return res.json({

token

})

}

return res

.status(401)

.json({

message:"Invalid"

})

}
