import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getHeroImage } from "../services/settingsService"
import { useTheme } from "../context/ThemeContext"
import fallbackImg from "../assets/hero.png"

export default function Hero() {

    const [heroImg, setHeroImg] = useState(fallbackImg)
    const { isDark, toggleTheme } = useTheme()

    useEffect(() => {
        const loadImg = async () => {
            try {
                const img = await getHeroImage()
                if (img) setHeroImg(img)
            } catch (e) {
                // keep fallback
            }
        }
        loadImg()
    }, [])

    return (
        <section className="relative min-h-screen overflow-hidden flex flex-col pt-28 px-8 transition-colors duration-300">

            {/* ── Gradient blob ── */}
            <div
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-30 dark:opacity-15 blur-3xl transition-opacity duration-300"
                style={{
                    background: "radial-gradient(circle, #f5cdb6 0%, #f0a0b8 35%, #d4a5d0 65%, #e8c9d8 100%)"
                }}
            />

            {/* ── Left side rail ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-10"
            >
                <span 
                    onClick={toggleTheme}
                    className="writing-vertical rotate-180 text-[10px] tracking-[0.25em] uppercase text-ink-light dark:text-white/50 cursor-pointer hover:text-ink dark:hover:text-white transition-colors"
                >
                    {isDark ? "Light Mode ☀" : "Dark Mode ☾"}
                </span>
                <div className="w-px h-12 bg-ink/10 dark:bg-white/10 transition-colors duration-300" />
                <span className="writing-vertical rotate-180 text-[10px] tracking-[0.25em] uppercase text-ink-light dark:text-white/50 transition-colors duration-300">
                    Scroll
                </span>
            </motion.div>

            {/* ── Right side rail ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-10"
            >
                <span className="writing-vertical rotate-180 text-[10px] tracking-[0.25em] uppercase text-ink-light dark:text-white/50 transition-colors duration-300">
                    Follow Us — Fb. / Ig / Tw.
                </span>
            </motion.div>

            {/* ── Main headline area ── */}
            <div className="flex-1 flex items-center justify-center relative z-10">
                <div className="text-center max-w-4xl mx-auto">

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.95]"
                    >
                        <span className="block text-ink dark:text-white transition-colors duration-300">Navodya</span>
                        <span
                            className="block bg-gradient-to-r from-accent-warm via-accent-pink to-accent-warm bg-clip-text text-transparent"
                        >
                            Theshan.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-6 text-lg md:text-xl text-ink-light dark:text-white/60 tracking-wide transition-colors duration-300"
                    >
                        Aspiring DevOps Engineer • Full-Stack Developer • Cloud Enthusiast
                    </motion.p>

                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="relative z-10 flex justify-between items-end pb-12 max-w-7xl mx-auto w-full">

                {/* Bottom-left: description + link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="max-w-xs"
                >
                    <p className="text-sm text-ink-light dark:text-white/60 leading-relaxed transition-colors duration-300">
                        I transform complex challenges into elegant solutions
                        using full-stack development, cloud infrastructure, and
                        DevOps practices.
                    </p>
                    <a href="#about" className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-ink dark:text-white hover:text-accent-warm dark:hover:text-accent-warm transition-colors duration-200">
                        Know more <span className="text-lg">→</span>
                    </a>
                </motion.div>

                {/* Bottom-right: avatar + play intro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="flex items-center gap-3"
                >
                    <img
                        src={heroImg}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover border-2 border-ink/10 dark:border-white/10 transition-colors duration-300"
                    />
                    <span className="text-sm font-medium text-ink dark:text-white transition-colors duration-300">Play Intro</span>
                </motion.div>

            </div>

        </section>
    )
}