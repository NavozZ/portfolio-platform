import { useEffect, useState } from "react"
import axios from "axios"
import { getProjects, deleteProject } from "../services/projectService"
import { getCertificates, createCertificate, updateCertificate, deleteCertificate } from "../services/certificateService"
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from "../services/achievementService"
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
  thumbnail: null,
  description: "",
  longDescription: "",
  stack: "",
  liveUrl: "",
  githubUrl: "",
  screenshots: null,
  relatedReportUrl: "",
  order: 0
})

const [heroImg, setHeroImg] = useState("")
const [heroPreview, setHeroPreview] = useState("")
const [heroUploading, setHeroUploading] = useState(false)

const [activeTab, setActiveTab] = useState("projects")

// ── Certificate state ──
const [certificates, setCertificates] = useState([])
const [certForm, setCertForm] = useState({
  title: "", issuer: "", image: null, certificateUrl: "",
  issueDate: "", pinned: false, order: 0
})
const [editingCertId, setEditingCertId] = useState(null)

// ── Achievement state ──
const [achievements, setAchievements] = useState([])
const [achForm, setAchForm] = useState({
  hackathonName: "", details: "", certificateImage: null,
  certificateUrl: "", date: "", order: 0
})
const [editingAchId, setEditingAchId] = useState(null)

useEffect(()=>{

load()
loadHeroImage()
loadCertificates()
loadAchievements()

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
  const { name, value, type, files } = e.target
  if (type === "file") {
    setForm({ ...form, [name]: name === "screenshots" ? files : files[0] })
  } else {
    setForm({ ...form, [name]: value })
  }
}

const handleSubmit = async (e) => {
  e.preventDefault()
  
  const formData = new FormData()
  Object.keys(form).forEach(key => {
    if (key === "thumbnail" && form.thumbnail) {
      formData.append("thumbnail", form.thumbnail)
    } else if (key === "screenshots" && form.screenshots) {
      Array.from(form.screenshots).forEach(file => formData.append("screenshots", file))
    } else if (key === "stack") {
      const arr = form.stack ? form.stack.split(",").map(i => i.trim()).filter(Boolean) : []
      arr.forEach(item => formData.append("stack", item))
    } else if (key !== "thumbnail" && key !== "screenshots") {
      formData.append(key, form[key])
    }
  })
  
  await axios.post(`${import.meta.env.VITE_API_URL}/projects`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
  
  alert("Project Added")
  
  setForm({
    title: "", category: "", thumbnail: null, description: "", longDescription: "",
    stack: "", liveUrl: "", githubUrl: "", screenshots: null, relatedReportUrl: "", order: 0
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

// ── Certificate handlers ──
const loadCertificates = async () => {
  try { setCertificates(await getCertificates()) } catch (e) { console.error(e) }
}

const handleCertChange = (e) => {
  const { name, value, type, checked, files } = e.target
  if (type === "file") {
    setCertForm({ ...certForm, [name]: files[0] })
  } else {
    setCertForm({ ...certForm, [name]: type === "checkbox" ? checked : value })
  }
}

const handleCertSubmit = async (e) => {
  e.preventDefault()
  const formData = new FormData()
  Object.keys(certForm).forEach(key => {
    if (key === "image" && certForm.image) formData.append("image", certForm.image)
    else if (key !== "image") formData.append(key, certForm[key])
  })
  
  if (editingCertId) {
    await updateCertificate(editingCertId, formData)
    setEditingCertId(null)
  } else {
    await createCertificate(formData)
  }
  setCertForm({ title: "", issuer: "", image: null, certificateUrl: "", issueDate: "", pinned: false, order: 0 })
  loadCertificates()
}

const editCert = (cert) => {
  setEditingCertId(cert._id)
  setCertForm({
    title: cert.title || "", issuer: cert.issuer || "", image: null,
    certificateUrl: cert.certificateUrl || "",
    issueDate: cert.issueDate ? cert.issueDate.substring(0, 10) : "",
    pinned: cert.pinned || false, order: cert.order || 0
  })
}

const removeCert = async (id) => {
  await deleteCertificate(id)
  loadCertificates()
}

// ── Achievement handlers ──
const loadAchievements = async () => {
  try { setAchievements(await getAchievements()) } catch (e) { console.error(e) }
}

const handleAchChange = (e) => {
  const { name, value, type, files } = e.target
  if (type === "file") {
    setAchForm({ ...achForm, [name]: files[0] })
  } else {
    setAchForm({ ...achForm, [name]: value })
  }
}

const handleAchSubmit = async (e) => {
  e.preventDefault()
  const formData = new FormData()
  Object.keys(achForm).forEach(key => {
    if (key === "certificateImage" && achForm.certificateImage) formData.append("certificateImage", achForm.certificateImage)
    else if (key !== "certificateImage") formData.append(key, achForm[key])
  })
  
  if (editingAchId) {
    await updateAchievement(editingAchId, formData)
    setEditingAchId(null)
  } else {
    await createAchievement(formData)
  }
  setAchForm({ hackathonName: "", details: "", certificateImage: null, certificateUrl: "", date: "", order: 0 })
  loadAchievements()
}

const editAch = (ach) => {
  setEditingAchId(ach._id)
  setAchForm({
    hackathonName: ach.hackathonName || "", details: ach.details || "",
    certificateImage: null, certificateUrl: ach.certificateUrl || "",
    date: ach.date ? ach.date.substring(0, 10) : "", order: ach.order || 0
  })
}

const removeAch = async (id) => {
  await deleteAchievement(id)
  loadAchievements()
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
mb-8
"
>

Admin

</h2>

{/* ── Tabs ── */}
<div className="flex gap-2 mb-12 flex-wrap">
  {["projects", "certificates", "achievements"].map(tab => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
        activeTab === tab
          ? "bg-purple-600 text-white"
          : "bg-white/10 hover:bg-white/20"
      }`}
    >
      {tab.charAt(0).toUpperCase() + tab.slice(1)}
    </button>
  ))}
</div>

{/* ════════ PROJECTS TAB ════════ */}
{activeTab === "projects" && (<>

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

<input type="file" accept="image/*" name="thumbnail" onChange={handleChange} className="w-full p-4 rounded-xl bg-white/10 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer" />

<textarea name="description" value={form.description} onChange={handleChange} placeholder="Short Description (Card)" className="w-full p-4 rounded-xl bg-white/10 h-24" />

<textarea name="longDescription" value={form.longDescription} onChange={handleChange} placeholder="Long Case Study Description" className="w-full p-4 rounded-xl bg-white/10 h-40" />

<input name="stack" value={form.stack} onChange={handleChange} placeholder="Tech Stack (comma-separated)" className="w-full p-4 rounded-xl bg-white/10" />

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="Live URL (for device preview)" className="w-full p-4 rounded-xl bg-white/10" />
  <input name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="GitHub URL" className="w-full p-4 rounded-xl bg-white/10" />
</div>

<input type="file" accept="image/*" multiple name="screenshots" onChange={handleChange} className="w-full p-4 rounded-xl bg-white/10 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer" />

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

</>)}

{/* ════════ CERTIFICATES TAB ════════ */}
{activeTab === "certificates" && (<>

<form onSubmit={handleCertSubmit} className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input name="title" value={certForm.title} onChange={handleCertChange} placeholder="Certificate Title *" className="w-full p-4 rounded-xl bg-white/10" required />
    <input name="issuer" value={certForm.issuer} onChange={handleCertChange} placeholder="Issuer (e.g. Coursera)" className="w-full p-4 rounded-xl bg-white/10" />
  </div>
  <input type="file" accept="image/*" name="image" onChange={handleCertChange} className="w-full p-4 rounded-xl bg-white/10 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer" />
  <input name="certificateUrl" value={certForm.certificateUrl} onChange={handleCertChange} placeholder="Verification URL (optional)" className="w-full p-4 rounded-xl bg-white/10" />
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <input type="date" name="issueDate" value={certForm.issueDate} onChange={handleCertChange} className="w-full p-4 rounded-xl bg-white/10" />
    <input type="number" name="order" value={certForm.order} onChange={handleCertChange} placeholder="Sort Order" className="w-full p-4 rounded-xl bg-white/10" />
    <label className="flex items-center gap-3 p-4 rounded-xl bg-white/10 cursor-pointer">
      <input type="checkbox" name="pinned" checked={certForm.pinned} onChange={handleCertChange} className="w-5 h-5" />
      <span>Pinned</span>
    </label>
  </div>
  <button className="bg-purple-600 px-8 py-4 rounded-xl">
    {editingCertId ? "Update Certificate" : "Save Certificate"}
  </button>
  {editingCertId && (
    <button type="button" onClick={() => { setEditingCertId(null); setCertForm({ title: "", issuer: "", image: null, certificateUrl: "", issueDate: "", pinned: false, order: 0 }) }} className="ml-4 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20">
      Cancel
    </button>
  )}
</form>

<div className="mt-16 space-y-6">
  {certificates.map((cert) => (
    <div key={cert._id} className="bg-white/5 p-6 rounded-2xl flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{cert.title}</h3>
        <p className="text-sm opacity-60">{cert.issuer}</p>
        {cert.pinned && <span className="inline-block mt-1 text-xs bg-accent-warm/20 text-accent-warm px-3 py-1 rounded-full">Pinned</span>}
      </div>
      <div className="flex gap-3">
        <button onClick={() => editCert(cert)} className="bg-blue-500 px-5 py-2 rounded">Edit</button>
        <button onClick={() => removeCert(cert._id)} className="bg-red-500 px-5 py-2 rounded">Delete</button>
      </div>
    </div>
  ))}
</div>

</>)}

{/* ════════ ACHIEVEMENTS TAB ════════ */}
{activeTab === "achievements" && (<>

<form onSubmit={handleAchSubmit} className="space-y-6">
  <input name="hackathonName" value={achForm.hackathonName} onChange={handleAchChange} placeholder="Hackathon / Event Name *" className="w-full p-4 rounded-xl bg-white/10" required />
  <textarea name="details" value={achForm.details} onChange={handleAchChange} placeholder="Achievement Details" className="w-full p-4 rounded-xl bg-white/10 h-28" />
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input type="file" accept="image/*" name="certificateImage" onChange={handleAchChange} className="w-full p-4 rounded-xl bg-white/10 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer" />
    <input name="certificateUrl" value={achForm.certificateUrl} onChange={handleAchChange} placeholder="Verification URL (optional)" className="w-full p-4 rounded-xl bg-white/10" />
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input type="date" name="date" value={achForm.date} onChange={handleAchChange} className="w-full p-4 rounded-xl bg-white/10" />
    <input type="number" name="order" value={achForm.order} onChange={handleAchChange} placeholder="Sort Order" className="w-full p-4 rounded-xl bg-white/10" />
  </div>
  <button className="bg-purple-600 px-8 py-4 rounded-xl">
    {editingAchId ? "Update Achievement" : "Save Achievement"}
  </button>
  {editingAchId && (
    <button type="button" onClick={() => { setEditingAchId(null); setAchForm({ hackathonName: "", details: "", certificateImage: null, certificateUrl: "", date: "", order: 0 }) }} className="ml-4 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20">
      Cancel
    </button>
  )}
</form>

<div className="mt-16 space-y-6">
  {achievements.map((ach) => (
    <div key={ach._id} className="bg-white/5 p-6 rounded-2xl flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{ach.hackathonName}</h3>
        <p className="text-sm opacity-60">{ach.date ? new Date(ach.date).toLocaleDateString() : ""}</p>
      </div>
      <div className="flex gap-3">
        <button onClick={() => editAch(ach)} className="bg-blue-500 px-5 py-2 rounded">Edit</button>
        <button onClick={() => removeAch(ach._id)} className="bg-red-500 px-5 py-2 rounded">Delete</button>
      </div>
    </div>
  ))}
</div>

</>)}

</section>

)

}
