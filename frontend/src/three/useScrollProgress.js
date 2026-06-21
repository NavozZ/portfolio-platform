import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function useScrollProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const trigger = ScrollTrigger.create({
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                setProgress(self.progress)
            }
        })

        return () => {
            trigger.kill()
        }
    }, [])

    return progress
}
