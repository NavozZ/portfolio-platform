import { useState } from "react"
import axios from "axios"

export default function Admin(){

const[
form,
setForm
]=useState({

title:"",
description:"",
stack:""

})

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

</section>

)

}
