import { useEffect, useState } from "react"
import axios from "axios"
import { getProjects, deleteProject } from "../services/projectService"

export default function Admin(){

const[
projects,
setProjects
]=
useState([])

const[
form,
setForm
]=useState({

title:"",
description:"",
stack:""

})

useEffect(()=>{

load()

},[])

const load=
async()=>{

const data=
await getProjects()

setProjects(data)

}

const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:
e.target.value

})

}

const handleSubmit=
async(e)=>{

e.preventDefault()

await axios.post(
"http://localhost:5000/api/projects",
{
title:form.title,
description:form.description,

stack:
form.stack
.split(",")
.map(
item=>item.trim()
)

}
)

alert(
"Project Added"
)

setForm({

title:"",
description:"",
stack:""

})

load()

}

const remove=
async(id)=>{

await deleteProject(
id
)

load()

}

return(

<section

className="
min-h-screen

max-w-3xl

mx-auto

px-6

py-32

"

>

<h2
className="
text-5xl
font-bold
mb-12
"
>

Admin

</h2>

<form

onSubmit={handleSubmit}

className="
space-y-6
"

>

<input

name="title"

value={form.title}

onChange={handleChange}

placeholder="Project Title"

className="
w-full

p-4

rounded-xl

bg-white/10

"

/>

<textarea

name="description"

value={form.description}

onChange={handleChange}

placeholder="Description"

className="
w-full

p-4

rounded-xl

bg-white/10

"

/>

<input

name="stack"

value={form.stack}

onChange={handleChange}

placeholder="React,Docker"

className="
w-full

p-4

rounded-xl

bg-white/10

"

/>

<button

className="
bg-purple-600

px-8
py-4

rounded-xl
"

>

Save Project

</button>

</form>

<div
className="
mt-16
space-y-6
"
>

{

projects.map(
(item)=>(

<div

key={item._id}

className="

bg-white/5

p-6

rounded-2xl

"

>

<h3>

{item.title}

</h3>

<button

onClick={()=>remove(
item._id
)}

className="

mt-4

bg-red-500

px-5
py-2

rounded

"

>

Delete

</button>

</div>

))

}

</div>

</section>

)

}
