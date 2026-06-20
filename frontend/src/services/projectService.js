import axios from "axios"

const API =

`${import.meta.env
.VITE_API_URL}/projects`

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

export const getProjectById = async (id) => {
  const response = await axios.get(`${API}/${id}`)
  return response.data
}

