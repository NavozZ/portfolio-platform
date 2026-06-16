import {
FaLinkedin,
FaGithub,
FaEnvelope,
FaDownload
}
from "react-icons/fa"

export default function Contact(){

return(

<section
id="contact"
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
tracking-widest
text-purple-400
"
>
Contact
</p>

<h2
className="
text-5xl
font-bold
mb-10
"
>
Get In Touch
</h2>

<p
className="
text-gray-400
max-w-2xl
"
>
Open to opportunities in
DevOps,
Full-Stack Development,
and Cloud Engineering.
</p>

<div
className="
mt-12
space-y-6
"
>

<a
href="mailto:navodyatheshan4@gmail.com"
className="
flex
gap-4
items-center
"
>
<FaEnvelope/>
navodyatheshan4@gmail.com
</a>

<a
href="https://www.linkedin.com/in/navodya-theshan"
target="_blank"
className="
flex
gap-4
items-center
"
>
<FaLinkedin/>
LinkedIn
</a>

<a
href="https://github.com/NavozZ"
target="_blank"
className="
flex
gap-4
items-center
"
>
<FaGithub/>
GitHub
</a>

</div>

<button
className="
mt-12
bg-purple-600
px-8
py-4
rounded-xl
hover:scale-105
duration-300
"
>
<FaDownload/>
 Download CV
</button>

</section>

)

}