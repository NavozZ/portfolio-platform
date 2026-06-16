import {
useEffect,
useState
}
from "react"

import {
motion
}
from "framer-motion"

import {
getProjects
}
from "../services/projectService"

export default function Projects(){

const[
projects,
setProjects
]=
useState([])

useEffect(()=>{

loadProjects()

},[])

const loadProjects=
async()=>{

try{

const data=
await getProjects()

setProjects(data)

}

catch(error){

console.log(error)

}

}

return(

<section

id="projects"

className="

scroll-mt-24

min-h-screen

max-w-7xl

mx-auto

px-6

py-32

"

>

<p
className="
uppercase
text-purple-400
"
>

Projects

</p>

<h2
className="
text-5xl
font-bold
mb-16
"
>

My Work

</h2>

<div
className="
grid
md:grid-cols-2
gap-8
"
>

{

projects.map((project)=>(

<motion.div

key={project._id}

whileHover={{
scale:1.02
}}

className="

bg-white/5

border

border-white/10

rounded-3xl

p-8

"

>

<h3
className="
text-3xl
font-bold
"
>

{project.title}

</h3>

<p
className="
mt-4
text-gray-400
"
>

{project.description}

</p>

<div
className="
mt-6
flex
gap-3
flex-wrap
"
>

{

project.stack?.map((tech)=>(

<span

key={tech}

className="
bg-purple-500/20
px-3
py-2
rounded-full
"

>

{tech}

</span>

))

}

</div>

</motion.div>

))

}

</div>

</section>

)

}