import { motion } from "framer-motion"

export default function About(){

return(

<section
id="about"
className="
scroll-mt-24
min-h-screen
max-w-7xl
mx-auto
px-6
flex
items-center
"
>

<motion.div
initial={{
opacity:0,
y:60
}}
whileInView={{
opacity:1,
y:0
}}
transition={{
duration:.8
}}
viewport={{
once:true
}}
className="w-full"
>

<p
className="
text-purple-400
uppercase
tracking-widest
"
>
Introduction
</p>

<h2
className="
text-5xl
font-bold
mt-2
"
>
About Me
</h2>

<p
className="
mt-8
text-gray-300
leading-8
max-w-3xl
"
>
Software Engineering undergraduate with interest in
Full-Stack Development, DevOps, Cloud Computing,
and building production-ready applications.

Experienced in developing modern web applications
using React, Node.js, Docker, and CI/CD workflows.

Focused on creating scalable and maintainable systems.
</p>

<div
className="
grid
md:grid-cols-3
gap-6
mt-16
"
>

<div className="
p-8
rounded-2xl
bg-white/5
hover:scale-105
duration-300
">
<h3 className="text-purple-400">
Full-Stack
</h3>
<p className="mt-4 text-gray-400">
React • Node • APIs
</p>
</div>

<div className="
p-8
rounded-2xl
bg-white/5
hover:scale-105
duration-300
">
<h3 className="text-purple-400">
DevOps
</h3>
<p className="mt-4 text-gray-400">
Docker • CI/CD • Cloud
</p>
</div>

<div className="
p-8
rounded-2xl
bg-white/5
hover:scale-105
duration-300
">
<h3 className="text-purple-400">
AI / ML
</h3>
<p className="mt-4 text-gray-400">
Python • Analytics
</p>
</div>

</div>

</motion.div>

</section>

)

}