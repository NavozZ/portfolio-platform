import axios from "axios"

const API =
"http://localhost:5000/api/projects"

export const getProjects=
async()=>{

const response=
await axios.get(API)

return response.data

}
