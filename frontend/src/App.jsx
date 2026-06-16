import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Admin from "./components/Admin"

export default function App() {

  return (

    <div
      className="

min-h-screen

bg-gradient-to-b
from-[#050816]
via-[#0c1220]
to-[#050816]

text-white

"

    >

      <Navbar />

      <Hero />

      <About />

      <Skills />

      <Projects />

      <Experience />

      <Contact />

      <Admin />

      <Footer />

    </div>

  )

}