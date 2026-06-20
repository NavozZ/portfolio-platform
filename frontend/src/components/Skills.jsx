import { motion } from "framer-motion"

const skills = [
    {
        title: "DevOps & Cloud",
        items: ["Docker", "GitHub Actions", "AWS", "CI/CD", "Terraform"]
    },
    {
        title: "Full Stack",
        items: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
        title: "AI / ML",
        items: ["Python", "scikit-learn", "Pandas"]
    }
]

export default function Skills() {

    return (

        <section
            id="skills"
            className="scroll-mt-24 min-h-screen max-w-7xl mx-auto px-8 py-32"
        >

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: .8 }}
                viewport={{ once: true }}
            >

                <p className="text-xs uppercase tracking-[0.25em] text-accent-warm">
                    Tech Stack
                </p>

                <h2 className="text-5xl md:text-6xl font-bold mt-3 mb-16 tracking-tight text-ink dark:text-white transition-colors duration-300">
                    Skills
                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    {skills.map((group) => (

                        <div
                            key={group.title}
                            className="rounded-2xl border border-ink/5 dark:border-white/10 bg-ink/[0.02] dark:bg-white/5 p-8 hover:border-accent-warm/20 dark:hover:border-accent-warm/20 hover:shadow-lg hover:shadow-accent-warm/5 transition-all duration-300"
                        >

                            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-accent-warm to-accent-pink bg-clip-text text-transparent">
                                {group.title}
                            </h3>

                            <div className="flex flex-wrap gap-3">

                                {group.items.map((item) => (

                                    <span
                                        key={item}
                                        className="px-4 py-2 rounded-full text-sm border border-accent-warm/15 text-ink-light dark:text-white/70 bg-accent-warm/5 dark:bg-accent-warm/10 hover:bg-accent-warm/10 dark:hover:bg-accent-warm/20 transition-colors duration-200"
                                    >
                                        {item}
                                    </span>

                                ))}

                            </div>

                        </div>

                    ))}

                </div>

            </motion.div>

        </section>

    )

}