import { useState, useEffect, useRef, Suspense, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment } from "@react-three/drei"
import * as THREE from "three"
import useScrollProgress from "./useScrollProgress"

/* ── Asset paths ── */
import laptopModel from "../assets/models/laptop.glb"
import dockerModel from "../assets/models/moby_dock_docker_whale.glb"

/* ── Preload models at module scope ── */
useGLTF.preload(laptopModel)
useGLTF.preload(dockerModel)

/* ── Device capability detection ── */
function useDeviceCapability() {
    const [lowPower, setLowPower] = useState(false)

    useEffect(() => {
        const cores = navigator.hardwareConcurrency || 2
        const isMobile = window.matchMedia("(max-width: 768px)").matches
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const isLow = cores <= 4 || isMobile || prefersReduced

        if (process.env.NODE_ENV !== "production") {
            console.log("3D Scene capability check:", { cores, isMobile, prefersReduced, lowPower: isLow })
        }
        setLowPower(isLow)
    }, [])

    return lowPower
}

/* ── Compute visibility (0→1) for a model given a scroll range ── */
function getVisibility(progress, start, end) {
    const fadeIn = 0.03   // 3% of scroll to fade in
    const fadeOut = 0.03  // 3% of scroll to fade out

    if (progress < start - fadeIn || progress > end + fadeOut) return 0
    if (progress < start) return (progress - (start - fadeIn)) / fadeIn
    if (progress > end) return 1 - (progress - end) / fadeOut
    return 1
}

/* ── Section-bound model: fades in/out based on scroll range ── */
function SectionModel({ modelPath, scrollProgress, scrollStart, scrollEnd, position, scale, rotationSpeed = 0.002 }) {
    const groupRef = useRef()
    const { scene } = useGLTF(modelPath)
    const clonedScene = useMemo(() => scene.clone(), [scene])

    useFrame(() => {
        if (!groupRef.current) return

        const visibility = getVisibility(scrollProgress, scrollStart, scrollEnd)

        // Fade opacity
        groupRef.current.visible = visibility > 0.01
        groupRef.current.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.transparent = true
                child.material.opacity = visibility
            }
        })

        // Slow auto-rotation
        groupRef.current.rotation.y += rotationSpeed

        // Subtle float up/down
        const t = Date.now() * 0.001
        groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15
    })

    return (
        <group ref={groupRef} position={position} scale={scale}>
            <primitive object={clonedScene} />
        </group>
    )
}

/*
 * ── Section → Model mapping ──
 * Home.jsx has 8 sections in order:
 *   Hero (0–0.125), About (0.125–0.25), Skills (0.25–0.375),
 *   Projects (0.375–0.5), Certificates (0.5–0.625),
 *   Achievements (0.625–0.75), Experience (0.75–0.875), Contact (0.875–1)
 *
 * Laptop     → Hero section        (0.00 – 0.12)
 * Server     → Projects section    (0.37 – 0.50)
 * Cloud      → Certificates section (0.50 – 0.62)
 * Docker     → Achievements section (0.62 – 0.75)
 */

/* ── Inner scene content ── */
function SceneContent({ lowPower }) {
    const scrollProgress = useScrollProgress()

    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow={!lowPower} />
            <directionalLight position={[-3, 4, -4]} intensity={0.4} color="#f5cdb6" />

            {!lowPower && (
                <Environment preset="studio" environmentIntensity={0.4} />
            )}

            {/* Laptop — Hero section, right side */}
            <SectionModel
                modelPath={laptopModel}
                scrollProgress={scrollProgress}
                scrollStart={0.0}
                scrollEnd={0.12}
                position={[3, -0.3, -1]}
                scale={0.06}
                rotationSpeed={0.002}
            />

            {/* Docker Whale — Achievements section, left side */}
            <SectionModel
                modelPath={dockerModel}
                scrollProgress={scrollProgress}
                scrollStart={0.62}
                scrollEnd={0.75}
                position={[-2.5, -0.5, -1]}
                scale={1.0}
                rotationSpeed={0.0025}
            />
        </>
    )
}

/* ── Main exported component ── */
export default function Scene3D() {
    const lowPower = useDeviceCapability()

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 0,
                pointerEvents: "none"
            }}
        >
            <Canvas
                dpr={lowPower ? 1 : Math.min(window.devicePixelRatio, 2)}
                camera={{ fov: 45, near: 0.1, far: 100, position: [0, 1, 6] }}
                gl={{
                    antialias: !lowPower,
                    alpha: true,
                    powerPreference: lowPower ? "low-power" : "high-performance"
                }}
                style={{ background: "transparent" }}
            >
                <Suspense fallback={null}>
                    <SceneContent lowPower={lowPower} />
                </Suspense>
            </Canvas>
        </div>
    )
}
