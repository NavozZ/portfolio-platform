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

export const createProject = async (data) => {
  const response = await axios.post(API, data, {
    headers: { "Content-Type": "multipart/form-data" }
  })
  return response.data
}

export const updateProject=
async(
id,
data
)=>{

await axios.put(

`${API}/${id}`,

data,
{ headers: { "Content-Type": "multipart/form-data" } }

)

}

export const getProjectById = async (id) => {
  const response = await axios.get(`${API}/${id}`)
  return response.data
}

export const updateProjectOrder = async (orderedList) => {
  const response = await axios.put(`${API}/reorder`, { orders: orderedList })
  return response.data
}

