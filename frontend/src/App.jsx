import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Admin from "./components/Admin"
import Login from "./components/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import AboutPage from "./pages/About"
import ProjectsPage from "./pages/Projects"
import ProjectDetails from "./pages/ProjectDetails"
import ContactPage from "./pages/Contact"
import Scene3D from "./three/Scene3D"

export default function App() {

  return (

    <div
      className="min-h-screen bg-cream text-ink dark:bg-[#0a0a0a] dark:text-white transition-colors duration-300"
    >

      <Navbar />

      {/* ── Persistent 3D background layer ── */}
      <Scene3D />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>

      <Footer />

    </div>

  )

}