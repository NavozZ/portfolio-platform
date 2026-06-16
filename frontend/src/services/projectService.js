import axios from "axios"

const API =
"http://localhost:5000/api/projects"

export const getProjects=
async()=>{

const response=
await axios.get(API)

return response.data

}

export const deleteProject=
async(id)=>{

await axios.delete(

`${API}/${id}`

)

}

export const updateProject=
async(
id,
data
)=>{

await axios.put(

`${API}/${id}`,

data

)

}
