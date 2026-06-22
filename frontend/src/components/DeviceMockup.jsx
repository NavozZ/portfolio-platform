import { useState, useEffect, useRef } from "react"

export default function DeviceMockup({ liveUrl, thumbnail, title }) {
    const [device, setDevice] = useState("desktop")

    return (
        <div className="w-full">

            {/* Toggle buttons */}
            <div className="flex justify-center gap-2 mb-8">
                <button
                    onClick={() => setDevice("desktop")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-200 ${
                        device === "desktop"
                            ? "bg-white/10 text-white"
                            : "text-white/40 hover:text-white/70"
                    }`}
                >
                    {/* Desktop icon */}
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <rect x="1" y="1" width="16" height="10" rx="1.5" />
                        <line x1="6" y1="13" x2="12" y2="13" />
                        <line x1="9" y1="11" x2="9" y2="13" />
                    </svg>
                    Desktop
                </button>
                <button
                    onClick={() => setDevice("mobile")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-200 ${
                        device === "mobile"
                            ? "bg-white/10 text-white"
                            : "text-white/40 hover:text-white/70"
                    }`}
                >
                    {/* Mobile icon */}
                    <svg width="12" height="18" viewBox="0 0 12 18" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <rect x="1" y="1" width="10" height="16" rx="2" />
                        <line x1="5" y1="14.5" x2="7" y2="14.5" />
                    </svg>
                    Mobile
                </button>
            </div>

            {/* Device Frame */}
            <div className="flex justify-center">
                {device === "desktop" ? (
                    <DesktopFrame liveUrl={liveUrl} thumbnail={thumbnail} title={title} />
                ) : (
                    <MobileFrame liveUrl={liveUrl} thumbnail={thumbnail} title={title} />
                )}
            </div>

        </div>
    )
}

function DesktopFrame({ liveUrl, thumbnail, title }) {
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (!containerRef.current || !liveUrl) return;
        
        let timeoutId;
        const observer = new ResizeObserver((entries) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                for (let entry of entries) {
                    setScale(entry.contentRect.width / 1280);
                }
            }, 50); // Debounce resize calculations
        });
        
        observer.observe(containerRef.current);
        return () => {
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, [liveUrl]);

    return (
        <div className="w-full max-w-4xl">
            {/* Screen bezel */}
            <div className="bg-[#1a1a1a] rounded-t-xl pt-3 px-3 pb-0 border border-white/10 border-b-0">
                {/* Top bar dots */}
                <div className="flex items-center gap-1.5 mb-3 px-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    <div className="flex-1 mx-8">
                        <div className="bg-white/5 rounded-md h-5 max-w-xs mx-auto flex items-center justify-center">
                            <span className="text-[10px] text-white/30 truncate px-3">
                                {liveUrl || title || "Preview"}
                            </span>
                        </div>
                    </div>
                </div>
                {/* Screen content */}
                <div ref={containerRef} className="aspect-[16/10] bg-[#0a0a0a] rounded-t-sm overflow-hidden">
                    {liveUrl ? (
                        <iframe
                            src={liveUrl}
                            title={title || "Project preview"}
                            className="w-[1280px] h-[800px] origin-top-left border-0"
                            style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
                            sandbox="allow-scripts allow-same-origin"
                        />
                    ) : thumbnail ? (
                        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">
                            No preview available
                        </div>
                    )}
                </div>
            </div>
            {/* Base */}
            <div className="bg-[#2a2a2a] h-4 rounded-b-xl border border-white/10 border-t-0 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/5 rounded-b" />
            </div>
        </div>
    )
}

function MobileFrame({ liveUrl, thumbnail, title }) {
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (!containerRef.current || !liveUrl) return;
        
        let timeoutId;
        const observer = new ResizeObserver((entries) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                for (let entry of entries) {
                    setScale(entry.contentRect.width / 390);
                }
            }, 50); // Debounce resize calculations
        });
        
        observer.observe(containerRef.current);
        return () => {
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, [liveUrl]);

    return (
        <div className="w-[280px]">
            {/* Phone bezel */}
            <div className="bg-[#1a1a1a] rounded-[2rem] p-3 border border-white/10">
                {/* Notch */}
                <div className="flex justify-center mb-2">
                    <div className="w-20 h-4 bg-[#0a0a0a] rounded-full" />
                </div>
                {/* Screen content */}
                <div ref={containerRef} className="aspect-[9/19.5] bg-[#0a0a0a] rounded-2xl overflow-hidden">
                    {liveUrl ? (
                        <iframe
                            src={liveUrl}
                            title={title || "Project preview"}
                            className="w-[390px] h-[844px] origin-top-left border-0"
                            style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
                            sandbox="allow-scripts allow-same-origin"
                        />
                    ) : thumbnail ? (
                        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">
                            No preview
                        </div>
                    )}
                </div>
                {/* Home indicator */}
                <div className="flex justify-center mt-2">
                    <div className="w-24 h-1 bg-white/20 rounded-full" />
                </div>
            </div>
        </div>
    )
}
