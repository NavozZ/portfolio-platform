import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { getProjects } from "../services/projectService"

export default function Projects() {

    const [projects, setProjects] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        loadProjects()
    }, [])

    const loadProjects = async () => {
        try {
            const data = await getProjects()
            setProjects(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <section
            id="projects"
            className="scroll-mt-24 py-32 transition-colors duration-300"
        >

            {/* ── Header ── */}
            <div className="text-center max-w-2xl mx-auto px-8 mb-20">

                <p className="text-xs uppercase tracking-[0.3em] text-accent-warm flex items-center justify-center gap-2 mb-6">
                    <span>→</span> Selected Works
                </p>

                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-ink dark:text-white transition-colors duration-300">
                    Design That
                    <br />
                    Drives Results
                </h2>

                <p className="mt-6 text-ink-light dark:text-white/50 text-sm leading-relaxed max-w-md mx-auto transition-colors duration-300">
                    Hand-picked projects built for real brands, real
                    goals, real growth.
                </p>

            </div>

            {/* ── Bordered Grid ── */}
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-ink/10 dark:border-white/10 transition-colors duration-300">

                    {projects.slice(0, 6).map((project, index) => (

                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => navigate(`/projects/${project._id}`)}
                            className="group cursor-pointer border-t border-l border-ink/10 dark:border-white/10 p-6 first:border-l-0 [&:nth-child(3n+1)]:border-l-0 [&:nth-child(-n+1)]:border-t-0 md:[&:nth-child(-n+2)]:border-t-0 lg:[&:nth-child(-n+3)]:border-t-0 transition-colors duration-300"
                        >

                            {/* Thumbnail */}
                            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-ink/[0.02] dark:bg-white/5 mb-5 transition-colors duration-300">
                                {project.thumbnail ? (
                                    <img
                                        src={project.thumbnail}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-ink-light dark:text-white/20 text-sm">
                                        No thumbnail
                                    </div>
                                )}
                            </div>

                            {/* Info row */}
                            <div className="flex items-end justify-between">
                                <div>
                                    <h3 className="font-semibold text-sm text-ink dark:text-white transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-ink-light dark:text-white/40 text-xs mt-1 transition-colors duration-300">
                                        {project.category || "Project"}
                                    </p>
                                </div>

                                {/* Arrow icon */}
                                <div className="w-8 h-8 rounded-full border border-ink/10 dark:border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-ink/5 dark:group-hover:bg-white/10 transition-colors duration-200 text-ink dark:text-white">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                        <path d="M2 10L10 2M10 2H4M10 2V8" />
                                    </svg>
                                </div>
                            </div>

                        </motion.div>

                    ))}

                </div>
            </div>

        </section>

    )

}