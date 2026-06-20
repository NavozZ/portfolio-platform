import { motion } from "framer-motion"

export default function About() {

    return (

        <section
            id="about"
            className="min-h-screen max-w-7xl mx-auto px-8 py-32 flex items-center"
        >

            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: .8 }}
                viewport={{ once: true }}
                className="w-full"
            >

                <p className="text-xs uppercase tracking-[0.25em] text-accent-warm">
                    Introduction
                </p>

                <h2 className="text-5xl md:text-6xl font-bold mt-3 tracking-tight text-ink dark:text-white transition-colors duration-300">
                    About Me
                </h2>

                <p className="mt-10 text-ink-light dark:text-white/60 leading-8 max-w-3xl text-lg transition-colors duration-300">
                    Software Engineering undergraduate with interest in
                    Full-Stack Development, DevOps, Cloud Computing,
                    and building production-ready applications.
                    Experienced in developing modern web applications
                    using React, Node.js, Docker, and CI/CD workflows.
                    Focused on creating scalable and maintainable systems.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-16">

                    <div className="p-8 rounded-2xl border border-ink/5 dark:border-white/10 bg-ink/[0.02] dark:bg-white/5 hover:border-accent-warm/20 dark:hover:border-accent-warm/20 hover:shadow-lg hover:shadow-accent-warm/5 transition-all duration-300">
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-accent-warm to-accent-pink bg-clip-text text-transparent">
                            Full-Stack
                        </h3>
                        <p className="mt-4 text-ink-light dark:text-white/60 text-sm transition-colors duration-300">
                            React • Node • APIs
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl border border-ink/5 dark:border-white/10 bg-ink/[0.02] dark:bg-white/5 hover:border-accent-warm/20 dark:hover:border-accent-warm/20 hover:shadow-lg hover:shadow-accent-warm/5 transition-all duration-300">
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-accent-warm to-accent-pink bg-clip-text text-transparent">
                            DevOps
                        </h3>
                        <p className="mt-4 text-ink-light dark:text-white/60 text-sm transition-colors duration-300">
                            Docker • CI/CD • Cloud
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl border border-ink/5 dark:border-white/10 bg-ink/[0.02] dark:bg-white/5 hover:border-accent-warm/20 dark:hover:border-accent-warm/20 hover:shadow-lg hover:shadow-accent-warm/5 transition-all duration-300">
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-accent-warm to-accent-pink bg-clip-text text-transparent">
                            AI / ML
                        </h3>
                        <p className="mt-4 text-ink-light dark:text-white/60 text-sm transition-colors duration-300">
                            Python • Analytics
                        </p>
                    </div>

                </div>

            </motion.div>

        </section>

    )

}
