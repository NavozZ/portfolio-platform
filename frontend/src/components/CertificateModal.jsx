import { useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

export default function CertificateModal({
    isOpen, onClose, title, issuer, image, certificateUrl, issueDate, pinned
}) {
    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return
        const handleKey = (e) => { if (e.key === "Escape") onClose() }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [isOpen, onClose])

    if (!isOpen) return null

    const formattedDate = issueDate
        ? new Date(issueDate).toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric"
        })
        : null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 12 }}
                transition={{ type: "spring", damping: 28, stiffness: 340 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[360px] rounded-2xl bg-white dark:bg-[#141414] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden"
            >
                {/* ── Image area ── */}
                <div className="relative aspect-[4/3] bg-ink/[0.03] dark:bg-white/5">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-ink-light/30 dark:text-white/10 text-sm">
                            No image
                        </div>
                    )}

                    {/* Pinned badge */}
                    {pinned && (
                        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-medium bg-accent-warm text-white px-2.5 py-1 rounded-full">
                            Pinned
                        </span>
                    )}

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/90 hover:bg-black/60 transition-colors"
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M2 2L10 10M10 2L2 10" />
                        </svg>
                    </button>
                </div>

                {/* ── Body ── */}
                <div className="p-6">
                    <h3 className="font-medium text-ink dark:text-white transition-colors duration-300 leading-snug">
                        {title}
                    </h3>

                    {(issuer || formattedDate) && (
                        <p className="mt-1.5 text-sm text-ink-light dark:text-white/40 transition-colors duration-300">
                            {issuer}{issuer && formattedDate && " · "}{formattedDate}
                        </p>
                    )}

                    {certificateUrl && (
                        <a
                            href={certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent-warm text-white text-sm font-medium hover:bg-accent-pink transition-colors duration-200"
                        >
                            Verify certificate
                            <ExternalLink size={14} strokeWidth={2.5} />
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}
