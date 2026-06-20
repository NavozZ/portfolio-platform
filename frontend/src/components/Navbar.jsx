import { Link, useLocation } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"

export default function Navbar() {
    const location = useLocation()
    const isHome = location.pathname === "/"
    const token = localStorage.getItem("token")
    const { isDark, toggleTheme } = useTheme()

    const logout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

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
                </div>

                {/* Right icon button */}
                <div className="flex items-center gap-4">
                    {token && (
                        <button
                            onClick={logout}
                            className="text-xs text-ink-light hover:text-accent-warm dark:text-white/50 dark:hover:text-accent-warm transition-colors duration-200"
                        >
                            Logout
                        </button>
                    )}
                    <button 
                        onClick={toggleTheme} 
                        className="w-10 h-10 rounded-full border border-ink/10 dark:border-white/10 flex items-center justify-center hover:bg-ink/5 dark:hover:bg-white/5 transition-colors duration-200 text-ink-light dark:text-white/70"
                    >
                        {isDark ? "☀" : "☾"}
                    </button>
                </div>

            </div>
        </nav>
    )
}