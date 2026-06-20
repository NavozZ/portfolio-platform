import { useEffect, useState } from "react"
import axios from "axios"
import { getProjects, deleteProject } from "../services/projectService"
import { getHeroImage, updateHeroImage } from "../services/settingsService"

export default function Admin(){

const[
projects,
setProjects
]=
useState([])

const [form, setForm] = useState({
  title: "",
  category: "",
  thumbnail: "",
  description: "",
  longDescription: "",
  stack: "",
  liveUrl: "",
  githubUrl: "",
  screenshots: "",
  relatedReportUrl: "",
  order: 0
})

const [heroImg, setHeroImg] = useState("")
const [heroPreview, setHeroPreview] = useState("")
const [heroUploading, setHeroUploading] = useState(false)

useEffect(()=>{

load()
loadHeroImage()

},[])

const load=
async()=>{

const data=
await getProjects()

setProjects(data)

}

const loadHeroImage = async () => {
  try {
    const img = await getHeroImage()
    if (img) setHeroImg(img)
  } catch (e) {
    console.error("Failed to load hero image", e)
  }
}

const handleHeroFile = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onloadend = () => {
    setHeroPreview(reader.result)
  }
  reader.readAsDataURL(file)
}

const handleHeroUpload = async () => {
  if (!heroPreview) return
  setHeroUploading(true)
  try {
    await updateHeroImage(heroPreview)
    setHeroImg(heroPreview)
    setHeroPreview("")
    alert("Hero image updated!")
  } catch (e) {
    alert("Failed to upload: " + e.message)
  }
  setHeroUploading(false)
}

const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:
e.target.value

})

}

const handleSubmit = async (e) => {
  e.preventDefault()
  
  await axios.post(`${import.meta.env.VITE_API_URL}/projects`, {
    ...form,
    stack: form.stack ? form.stack.split(",").map(i => i.trim()).filter(Boolean) : [],
    screenshots: form.screenshots ? form.screenshots.split(",").map(i => i.trim()).filter(Boolean) : [],
    order: Number(form.order) || 0
  })
  
  alert("Project Added")
  
  setForm({
    title: "", category: "", thumbnail: "", description: "", longDescription: "",
    stack: "", liveUrl: "", githubUrl: "", screenshots: "", relatedReportUrl: "", order: 0
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

{/* Hero Image Upload */}
<div className="mb-16 p-6 rounded-2xl bg-white/5">
  <h3 className="text-2xl font-bold mb-6">Hero Image</h3>
  <div className="flex items-center gap-6 flex-wrap">
    {(heroPreview || heroImg) && (
      <img
        src={heroPreview || heroImg}
        alt="Hero preview"
        className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
      />
    )}
    <div className="flex-1 space-y-3">
      <input
        type="file"
        accept="image/*"
        onChange={handleHeroFile}
        className="w-full p-3 rounded-xl bg-white/10 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer"
      />
      <button
        onClick={handleHeroUpload}
        disabled={!heroPreview || heroUploading}
        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 px-6 py-3 rounded-xl transition-colors"
      >
        {heroUploading ? "Uploading..." : "Upload Hero Image"}
      </button>
    </div>
  </div>
</div>

<form

onSubmit={handleSubmit}

className="
space-y-6
"

>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <input name="title" value={form.title} onChange={handleChange} placeholder="Project Title *" className="w-full p-4 rounded-xl bg-white/10" required />
  <input name="category" value={form.category} onChange={handleChange} placeholder="Category (e.g. Brand Identity)" className="w-full p-4 rounded-xl bg-white/10" />
</div>

<input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="Thumbnail Image URL" className="w-full p-4 rounded-xl bg-white/10" />

<textarea name="description" value={form.description} onChange={handleChange} placeholder="Short Description (Card)" className="w-full p-4 rounded-xl bg-white/10 h-24" />

<textarea name="longDescription" value={form.longDescription} onChange={handleChange} placeholder="Long Case Study Description" className="w-full p-4 rounded-xl bg-white/10 h-40" />

<input name="stack" value={form.stack} onChange={handleChange} placeholder="Tech Stack (comma-separated)" className="w-full p-4 rounded-xl bg-white/10" />

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="Live URL (for device preview)" className="w-full p-4 rounded-xl bg-white/10" />
  <input name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="GitHub URL" className="w-full p-4 rounded-xl bg-white/10" />
</div>

<textarea name="screenshots" value={form.screenshots} onChange={handleChange} placeholder="Screenshot URLs (comma-separated)" className="w-full p-4 rounded-xl bg-white/10 h-24" />

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <input name="relatedReportUrl" value={form.relatedReportUrl} onChange={handleChange} placeholder="Related Report URL" className="w-full p-4 rounded-xl bg-white/10" />
  <input type="number" name="order" value={form.order} onChange={handleChange} placeholder="Sort Order (0 is first)" className="w-full p-4 rounded-xl bg-white/10" />
</div>

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
