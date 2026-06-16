import { motion } from "framer-motion"

const experiences=[

{
year:"2025–2026",
title:"Web Development Intern",
company:"Parallax Digital",
desc:
"Worked on frontend and backend development, debugging, testing, and Agile workflows."
},

{
year:"2025–Present",
title:"Tech Committee Member",
company:"FOSS Community",
desc:
"Organized technical workshops and collaborated on community initiatives."
},

{
year:"2023–Present",
title:"BSc Software Engineering",
company:"University of Plymouth",
desc:
"Building expertise in Full-Stack Development, DevOps, Cloud, and AI."
}

]

export default function Experience(){

return(

<section
id="experience"
className="
scroll-mt-24
min-h-screen
max-w-5xl
mx-auto
px-6
py-32
"
>

<p
className="
uppercase
tracking-widest
text-purple-400
"
>
Journey
</p>

<h2
className="
text-5xl
font-bold
mb-16
"
>
Experience
</h2>

<div className="space-y-8">

{
experiences.map((item,index)=>(

<motion.div
key={index}
initial={{
opacity:0,
x:-50
}}
whileInView={{
opacity:1,
x:0
}}
transition={{
duration:.7
}}
viewport={{
once:true
}}
className="
bg-white/5
border
border-white/10
rounded-3xl
p-8
"
>

<p className="text-purple-400">
{item.year}
</p>

<h3 className="text-2xl font-bold">
{item.title}
</h3>

<p className="text-gray-400">
{item.company}
</p>

<p className="mt-4 text-gray-300">
{item.desc}
</p>

</motion.div>

))
}

</div>

</section>

)

}