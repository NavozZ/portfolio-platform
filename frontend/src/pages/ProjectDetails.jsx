import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa"
import { getProjectById } from "../services/projectService"
import DeviceMockup from "../components/DeviceMockup"

export default function ProjectDetails() {

    const { id } = useParams()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getProjectById(id)
                setProject(data)
            } catch (e) {
                console.error("Failed to load project", e)
            }
            setLoading(false)
        }
        load()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center transition-colors duration-300">
                <div className="w-8 h-8 border-2 border-ink/20 dark:border-white/20 border-t-accent-warm rounded-full animate-spin" />
            </div>
        )
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 transition-colors duration-300">
                <p className="text-ink-light dark:text-white/50">Project not found</p>
                <Link to="/projects" className="text-accent-warm text-sm hover:underline">← Back to projects</Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen transition-colors duration-300">

            {/* ── Back link ── */}
            <div className="max-w-7xl mx-auto px-8 pt-28 pb-8">
                <Link
                    to="/#projects"
                    className="inline-flex items-center gap-2 text-sm text-ink-light dark:text-white/40 hover:text-ink dark:hover:text-white transition-colors duration-200"
                >
                    <FaArrowLeft className="text-xs" />
                    Back to projects
                </Link>
            </div>

            {/* ── Device Mockup ── */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto px-8 mb-20"
            >
                <DeviceMockup
                    liveUrl={project.liveUrl}
                    thumbnail={project.thumbnail}
                    title={project.title}
                />
            </motion.div>

            {/* ── Project Info ── */}
            <div className="max-w-4xl mx-auto px-8 pb-20">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {project.category && (
                        <p className="text-xs uppercase tracking-[0.25em] text-accent-warm mb-4">
                            {project.category}
                        </p>
                    )}

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-white transition-colors duration-300">
                        {project.title}
                    </h1>

                    {project.description && (
                        <p className="mt-4 text-ink-light dark:text-white/50 text-lg max-w-2xl transition-colors duration-300">
                            {project.description}
                        </p>
                    )}

                    {project.longDescription && (
                        <div className="mt-8 text-ink dark:text-white/70 leading-relaxed max-w-3xl whitespace-pre-line transition-colors duration-300">
                            {project.longDescription}
                        </div>
                    )}
                </motion.div>

                {/* ── Built With ── */}
                {project.stack?.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-16"
                    >
                        <h3 className="text-xs uppercase tracking-[0.25em] text-ink-light dark:text-white/40 mb-5 transition-colors duration-300">
                            Built With
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {project.stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 rounded-full text-sm border border-ink/10 dark:border-white/10 text-ink dark:text-white/70 bg-ink/5 dark:bg-white/5 transition-colors duration-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ── Links ── */}
                {(project.githubUrl || project.liveUrl) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-12 flex flex-wrap gap-4"
                    >
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-ink/10 dark:border-white/10 text-sm text-ink dark:text-white/70 hover:bg-ink/5 dark:hover:bg-white/5 transition-all duration-200"
                            >
                                <FaGithub />
                                View on GitHub
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent-warm/10 border border-accent-warm/20 text-sm text-accent-warm hover:bg-accent-warm/20 transition-all duration-200"
                            >
                                <FaExternalLinkAlt className="text-xs" />
                                Visit Live Site
                            </a>
                        )}
                    </motion.div>
                )}

                {/* ── Related Work / Report ── */}
                {(project.relatedReportUrl || project.screenshots?.length > 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-20 pt-16 border-t border-ink/10 dark:border-white/10 transition-colors duration-300"
                    >
                        <h3 className="text-xs uppercase tracking-[0.25em] text-ink-light dark:text-white/40 mb-8 transition-colors duration-300">
                            Related Work / Report
                        </h3>

                        {project.relatedReportUrl && (
                            <a
                                href={project.relatedReportUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-ink/10 dark:border-white/10 text-sm text-ink dark:text-white/70 hover:bg-ink/5 dark:hover:bg-white/5 transition-all duration-200 mb-8"
                            >
                                <FaExternalLinkAlt className="text-xs" />
                                View Report
                            </a>
                        )}

                        {project.screenshots?.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                                {project.screenshots.map((src, i) => (
                                    <a
                                        key={i}
                                        href={src}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group aspect-[4/3] rounded-xl overflow-hidden bg-ink/5 dark:bg-white/5 border border-ink/5 dark:border-white/5 hover:border-ink/20 dark:hover:border-white/20 transition-all duration-300"
                                    >
                                        <img
                                            src={src}
                                            alt={`${project.title} screenshot ${i + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </a>
                                ))}
                            </div>
                        )}

                    </motion.div>
                )}

            </div>

        </div>
    )
}
