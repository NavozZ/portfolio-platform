import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getAchievements } from "../services/achievementService"
import CertificateModal from "./CertificateModal"

export default function Achievements() {
    const [achievements, setAchievements] = useState([])
    const [selectedAchievement, setSelectedAchievement] = useState(null)

    useEffect(() => {
        loadAchievements()
    }, [])

    const loadAchievements = async () => {
        try {
            const data = await getAchievements()
            setAchievements(Array.isArray(data) ? data : [])
        } catch (error) {
            console.log(error)
            setAchievements([])
        }
    }

    return (
        <section id="achievements" className="scroll-mt-24 py-32 transition-colors duration-300">
            <div className="text-center max-w-2xl mx-auto px-8 mb-20">
                <p className="text-xs uppercase tracking-[0.3em] text-accent-warm flex items-center justify-center gap-2 mb-6">
                    <span>→</span> Recognition
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-ink dark:text-white transition-colors duration-300">
                    Where the Work Paid Off
                </h2>
                <p className="mt-6 text-ink-light dark:text-white/50 text-sm leading-relaxed max-w-md mx-auto transition-colors duration-300">
                    Hackathon wins and competitive builds under real time pressure.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-ink/10 dark:border-white/10 transition-colors duration-300">
                    <AnimatePresence mode="popLayout">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                layout
                                key={achievement._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}
                                onClick={() => setSelectedAchievement(achievement)}
                                className="group cursor-pointer border-t border-l border-ink/10 dark:border-white/10 p-6 first:border-l-0 [&:nth-child(3n+1)]:border-l-0 [&:nth-child(-n+1)]:border-t-0 md:[&:nth-child(-n+2)]:border-t-0 lg:[&:nth-child(-n+3)]:border-t-0 transition-colors duration-300"
                            >
                                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-ink/[0.02] dark:bg-white/5 mb-5 transition-colors duration-300 relative">
                                    {achievement.certificateImage ? (
                                        <img
                                            src={achievement.certificateImage}
                                            alt={achievement.hackathonName}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col p-6 bg-gradient-to-br from-ink/[0.02] to-ink/5 dark:from-white/5 dark:to-white/10 text-ink dark:text-white items-center justify-center text-center transition-colors duration-300">
                                            <span className="text-2xl mb-2">🏆</span>
                                            <h4 className="font-bold text-lg mb-1">{achievement.hackathonName}</h4>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col justify-between h-[80px]">
                                    <div>
                                        <h3 className="font-semibold text-sm text-ink dark:text-white transition-colors duration-300">
                                            {achievement.hackathonName}
                                        </h3>
                                        <p className="text-ink-light dark:text-white/40 text-xs mt-1 transition-colors duration-300 line-clamp-1">
                                            {achievement.details || "Achievement details"}
                                        </p>
                                    </div>
                                    {achievement.date && (
                                        <p className="text-xs font-mono text-ink-light/70 dark:text-white/30 mt-2">
                                            {new Date(achievement.date).getFullYear()}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {selectedAchievement && (
                    <CertificateModal
                        isOpen={!!selectedAchievement}
                        onClose={() => setSelectedAchievement(null)}
                        title={selectedAchievement.hackathonName}
                        issuer={null}
                        image={selectedAchievement.certificateImage}
                        certificateUrl={selectedAchievement.certificateUrl}
                        issueDate={selectedAchievement.date}
                        pinned={false}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}
