import {
    FaLinkedin,
    FaGithub,
    FaEnvelope,
    FaDownload
} from "react-icons/fa"

export default function Contact() {

    return (

        <section
            id="contact"
            className="scroll-mt-24 min-h-screen max-w-7xl mx-auto px-8 py-32"
        >

            <p className="text-xs uppercase tracking-[0.25em] text-accent-warm">
                Contact
            </p>

            <h2 className="text-5xl md:text-6xl font-bold mb-10 mt-3 tracking-tight text-ink dark:text-white transition-colors duration-300">
                Get In Touch
            </h2>

            <p className="text-ink-light dark:text-white/60 max-w-2xl text-lg leading-relaxed transition-colors duration-300">
                Open to opportunities in
                DevOps, Full-Stack Development,
                and Cloud Engineering.
            </p>

            <div className="mt-12 space-y-5">

                <a
                    href="mailto:navodyatheshan4@gmail.com"
                    className="flex gap-4 items-center text-ink-light dark:text-white/60 hover:text-accent-warm dark:hover:text-accent-warm transition-colors duration-200 group"
                >
                    <span className="w-10 h-10 rounded-full border border-ink/10 dark:border-white/10 flex items-center justify-center group-hover:border-accent-warm/30 dark:group-hover:border-accent-warm/30 group-hover:bg-accent-warm/5 dark:group-hover:bg-accent-warm/10 transition-all duration-200">
                        <FaEnvelope className="text-sm" />
                    </span>
                    navodyatheshan4@gmail.com
                </a>

                <a
                    href="https://www.linkedin.com/in/navodya-theshan"
                    target="_blank"
                    className="flex gap-4 items-center text-ink-light dark:text-white/60 hover:text-accent-warm dark:hover:text-accent-warm transition-colors duration-200 group"
                >
                    <span className="w-10 h-10 rounded-full border border-ink/10 dark:border-white/10 flex items-center justify-center group-hover:border-accent-warm/30 dark:group-hover:border-accent-warm/30 group-hover:bg-accent-warm/5 dark:group-hover:bg-accent-warm/10 transition-all duration-200">
                        <FaLinkedin className="text-sm" />
                    </span>
                    LinkedIn
                </a>

                <a
                    href="https://github.com/NavozZ"
                    target="_blank"
                    className="flex gap-4 items-center text-ink-light dark:text-white/60 hover:text-accent-warm dark:hover:text-accent-warm transition-colors duration-200 group"
                >
                    <span className="w-10 h-10 rounded-full border border-ink/10 dark:border-white/10 flex items-center justify-center group-hover:border-accent-warm/30 dark:group-hover:border-accent-warm/30 group-hover:bg-accent-warm/5 dark:group-hover:bg-accent-warm/10 transition-all duration-200">
                        <FaGithub className="text-sm" />
                    </span>
                    GitHub
                </a>

            </div>

            <button className="mt-12 inline-flex items-center gap-3 bg-gradient-to-r from-accent-warm to-accent-pink text-white px-8 py-4 rounded-full hover:shadow-lg hover:shadow-accent-warm/20 hover:scale-105 transition-all duration-300 font-medium">
                <FaDownload className="text-sm" />
                Download CV
            </button>

        </section>

    )

}