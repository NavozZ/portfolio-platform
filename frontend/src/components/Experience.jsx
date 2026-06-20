import { motion } from "framer-motion"

const experiences = [
    {
        year: "2025–2026",
        title: "Web Development Intern",
        company: "Parallax Digital",
        desc: "Worked on frontend and backend development, debugging, testing, and Agile workflows."
    },
    {
        year: "2025–Present",
        title: "Tech Committee Member",
        company: "FOSS Community",
        desc: "Organized technical workshops and collaborated on community initiatives."
    },
    {
        year: "2023–Present",
        title: "BSc Software Engineering",
        company: "University of Plymouth",
        desc: "Building expertise in Full-Stack Development, DevOps, Cloud, and AI."
    }
]

export default function Experience() {

    return (

        <section
            id="experience"
            className="scroll-mt-24 min-h-screen max-w-5xl mx-auto px-8 py-32"
        >

            <p className="text-xs uppercase tracking-[0.25em] text-accent-warm">
                Journey
            </p>

            <h2 className="text-5xl md:text-6xl font-bold mb-16 mt-3 tracking-tight text-ink dark:text-white transition-colors duration-300">
                Experience
            </h2>

            <div className="space-y-6">

                {experiences.map((item, index) => (

                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: .7 }}
                        viewport={{ once: true }}
                        className="rounded-3xl border border-ink/5 dark:border-white/10 bg-ink/[0.02] dark:bg-white/5 p-8 hover:border-accent-warm/20 dark:hover:border-accent-warm/20 hover:shadow-lg hover:shadow-accent-warm/5 transition-all duration-300"
                    >

                        <p className="text-sm font-medium bg-gradient-to-r from-accent-warm to-accent-pink bg-clip-text text-transparent">
                            {item.year}
                        </p>

                        <h3 className="text-2xl font-bold mt-2 text-ink dark:text-white transition-colors duration-300">
                            {item.title}
                        </h3>

                        <p className="text-ink-light dark:text-white/60 text-sm mt-1 transition-colors duration-300">
                            {item.company}
                        </p>

                        <p className="mt-4 text-ink-light dark:text-white/60 leading-relaxed transition-colors duration-300">
                            {item.desc}
                        </p>

                    </motion.div>

                ))}

            </div>

        </section>

    )

}