import { motion } from "framer-motion"

const projects = [
{
title:"CryptoPulse",
description:
"AI-powered crypto analytics platform with Full-Stack architecture and DevOps workflows.",

stack:[
"React",
"Node.js",
"Docker",
"GitHub Actions",
"MongoDB"
]
},
{
title:"Visit Sri Lanka",
description:
"Flutter travel guide application with Firebase backend integration.",

stack:[
"Flutter",
"Firebase",
"Firestore"
]
},
{
title:"Portfolio Platform",
description:
"Production-ready portfolio with Docker, CI/CD, and cloud deployment.",

stack:[
"React",
"Docker",
"CI/CD"
]
}
]

export default function Projects(){

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

<motion.div
initial={{
opacity:0
}}
whileInView={{
opacity:1
}}
transition={{
duration:.8
}}
viewport={{
once:true
}}
>

<p
className="
uppercase
tracking-widest
text-purple-400
"
>
My Work
</p>

<h2
className="
text-5xl
font-bold
mb-16
"
>
Projects
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

<div
key={project.title}
className="
bg-white/5
border
border-white/10
backdrop-blur
rounded-3xl
p-8
hover:scale-[1.02]
duration-300
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
mt-6
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
project.stack.map((tech)=>(

<span
key={tech}
className="
px-3
py-2
rounded-full
bg-purple-500/20
"
>
{tech}
</span>

))
}

</div>

<div
className="
mt-8
flex
gap-4
"
>

<button
className="
bg-purple-600
px-6
py-3
rounded-xl
"
>
Live
</button>

<button
className="
border
px-6
py-3
rounded-xl
"
>
GitHub
</button>

</div>

</div>

))
}

</div>

</motion.div>

</section>

)

}