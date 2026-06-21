import { Link, useLocation } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { Sun, Moon } from "lucide-react"

export default function Navbar() {
    const location = useLocation()
    const isHome = location.pathname === "/"
    const { isDark, toggleTheme } = useTheme()
    const { token, logout } = useAuth()

    const NavLink = ({ to, anchor, children, accent }) => {
        const base = "text-sm tracking-wide transition-colors duration-200"
        if (accent) {
            const pill = `${base} bg-accent-warm/15 text-accent-warm px-5 py-2 rounded-full dark:bg-accent-warm/20`
            return isHome && anchor
                ? <a href={anchor} className={pill}>{children}</a>
                : <Link to={to} className={pill}>{children}</Link>
        }
        const normal = `${base} text-ink-light hover:text-ink dark:text-white/60 dark:hover:text-white`
        return isHome && anchor
            ? <a href={anchor} className={normal}>{children}</a>
            : <Link to={to} className={normal}>{children}</Link>
    }

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-cream/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-6">

                {/* Logo */}
                <Link to="/" className="text-lg font-bold tracking-tight text-ink dark:text-white transition-colors duration-300">
                    Navodya Theshan
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink to="/" anchor={null}>Home Page</NavLink>
                    <NavLink to="/about" anchor="#about">About me</NavLink>
                    <NavLink to="/projects" anchor="#projects">Projects</NavLink>
                    <NavLink to="/contact" anchor="#contact" accent>Contact</NavLink>
                    {token && <NavLink to="/admin" anchor={null}>Admin</NavLink>}
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-4">
                    {token && (
                        <button
                            onClick={logout}
                            className="text-xs text-ink-light hover:text-accent-warm dark:text-white/50 dark:hover:text-accent-warm transition-colors duration-200"
                        >
                            Logout
                        </button>
                    )}
                    {/* Pill toggle switch */}
                    <button
                        role="switch"
                        aria-checked={isDark}
                        aria-label="Toggle dark mode"
                        onClick={toggleTheme}
                        className={`relative w-14 h-[30px] rounded-full transition-colors duration-300 flex items-center px-[3px] ${
                            isDark ? "bg-accent-warm" : "bg-ink/15"
                        }`}
                    >
                        <span
                            className={`w-6 h-6 rounded-full bg-cream dark:bg-[#0a0a0a] flex items-center justify-center shadow-sm transition-transform duration-300 ${
                                isDark ? "translate-x-[22px]" : "translate-x-0"
                            }`}
                        >
                            {isDark
                                ? <Sun size={13} className="text-accent-warm" strokeWidth={2.5} />
                                : <Moon size={13} className="text-ink-light" strokeWidth={2.5} />
                            }
                        </span>
                    </button>
                </div>

            </div>
        </nav>
    )
}