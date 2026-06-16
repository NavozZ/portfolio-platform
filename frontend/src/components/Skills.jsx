import { motion } from "framer-motion"

const skills = [
{
title:"DevOps & Cloud",
items:[
"Docker",
"GitHub Actions",
"AWS",
"CI/CD",
"Terraform",
]
},
{
title:"Full Stack",
items:[
"React",
"Node.js",
"MongoDB",
"Express",
]
},
{
title:"AI / ML",
items:[
"Python",
"scikit-learn",
"Pandas",
]
}
]

export default function Skills(){

return(

<section
id="skills"
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
Tech Stack
</p>

<h2
className="
text-5xl
font-bold
mt-2
mb-16
"
>
Skills
</h2>

<div
className="
grid
md:grid-cols-3
gap-8
"
>

{
skills.map((group)=>(

<div
key={group.title}
className="
rounded-2xl
bg-white/5
p-8
hover:scale-105
duration-300
"
>

<h3
className="
text-2xl
font-bold
mb-6
text-purple-400
"
>
{group.title}
</h3>

<div
className="
flex
flex-wrap
gap-3
"
>

{
group.items.map((item)=>(

<span
key={item}
className="
px-4
py-2
rounded-full
bg-purple-500/20
"
>
{item}
</span>

))
}

</div>

</div>

))
}

</div>

</motion.div>

</section>

)

}