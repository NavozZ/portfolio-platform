import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getCertificates } from "../services/certificateService"
import CertificateModal from "./CertificateModal"

export default function Certificates() {
    const [certificates, setCertificates] = useState([])
    const [showAll, setShowAll] = useState(false)
    const [selectedCert, setSelectedCert] = useState(null)

    useEffect(() => {
        loadCertificates()
    }, [])

    const loadCertificates = async () => {
        try {
            const data = await getCertificates()
            setCertificates(data)
        } catch (error) {
            console.log(error)
        }
    }

    const visible = showAll ? certificates : certificates.slice(0, 6)

    return (
        <section id="certificates" className="scroll-mt-24 py-32 transition-colors duration-300">

            {/* ── Header ── */}
            <div className="text-center max-w-2xl mx-auto px-8 mb-20">
                <p className="text-xs uppercase tracking-[0.3em] text-accent-warm flex items-center justify-center gap-2 mb-6">
                    <span>→</span> Credentials
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-ink dark:text-white transition-colors duration-300">
                    Certificates
                </h2>
                <p className="mt-6 text-ink-light dark:text-white/50 text-sm leading-relaxed max-w-md mx-auto transition-colors duration-300">
                    Professional certifications and course completions.
                </p>
            </div>

            {/* ── Grid ── */}
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-ink/10 dark:border-white/10 transition-colors duration-300">
                    <AnimatePresence mode="popLayout">
                        {visible.map((cert, index) => (
                            <motion.div
                                layout
                                key={cert._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}
                                onClick={() => setSelectedCert(cert)}
                                className="group cursor-pointer border-t border-l border-ink/10 dark:border-white/10 p-6 first:border-l-0 [&:nth-child(3n+1)]:border-l-0 [&:nth-child(-n+1)]:border-t-0 md:[&:nth-child(-n+2)]:border-t-0 lg:[&:nth-child(-n+3)]:border-t-0 transition-colors duration-300"
                            >
                                {/* Thumbnail */}
                                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-ink/[0.02] dark:bg-white/5 mb-5 transition-colors duration-300 relative">
                                    {cert.pinned && (
                                        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider bg-accent-warm/90 text-white px-2.5 py-1 rounded-full z-10">
                                            Pinned
                                        </span>
                                    )}
                                    {cert.image ? (
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-ink-light dark:text-white/20 text-sm">
                                            No image
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex items-end justify-between">
                                    <div>
                                        <h3 className="font-semibold text-sm text-ink dark:text-white transition-colors duration-300">
                                            {cert.title}
                                        </h3>
                                        <p className="text-ink-light dark:text-white/40 text-xs mt-1 transition-colors duration-300">
                                            {cert.issuer || "Certificate"}
                                        </p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full border border-ink/10 dark:border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-ink/5 dark:group-hover:bg-white/10 transition-colors duration-200 text-ink dark:text-white">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                            <path d="M2 10L10 2M10 2H4M10 2V8" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* View All toggle */}
                {certificates.length > 6 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-8 py-3 rounded-full border border-ink/10 dark:border-white/10 text-sm text-ink-light dark:text-white/60 hover:bg-ink/5 dark:hover:bg-white/5 transition-all duration-200"
                        >
                            {showAll ? "Show Less" : `View All (${certificates.length})`}
                        </button>
                    </div>
                )}
            </div>

            {/* ── Modal ── */}
            <AnimatePresence>
                {selectedCert && (
                    <CertificateModal
                        isOpen={!!selectedCert}
                        onClose={() => setSelectedCert(null)}
                        title={selectedCert.title}
                        issuer={selectedCert.issuer}
                        image={selectedCert.image}
                        certificateUrl={selectedCert.certificateUrl}
                        issueDate={selectedCert.issueDate}
                        pinned={selectedCert.pinned}
                    />
                )}
            </AnimatePresence>

        </section>
    )
}
