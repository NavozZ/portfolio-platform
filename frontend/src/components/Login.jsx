import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios"
import { API_BASE } from "../services/apiConfig"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { login } = useAuth()

    const submit = async () => {
        try {
            const res = await axios.post(`${API_BASE}/auth/login`, { email, password })
            login(res.data.token)
            navigate("/admin")
        } catch {
            alert("Invalid Credentials")
        }
    }

    return (
        <section className="min-h-screen max-w-xl mx-auto py-32 px-8 transition-colors duration-300">
            <h2 className="text-4xl mb-8 font-bold text-ink dark:text-white transition-colors duration-300">Admin Login</h2>
            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 mb-4 bg-ink/5 dark:bg-white/10 text-ink dark:text-white rounded-lg border border-ink/10 dark:border-white/10 focus:outline-none focus:border-accent-warm transition-colors duration-300"
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 mb-4 bg-ink/5 dark:bg-white/10 text-ink dark:text-white rounded-lg border border-ink/10 dark:border-white/10 focus:outline-none focus:border-accent-warm transition-colors duration-300"
            />
            <button
                onClick={submit}
                className="bg-accent-warm hover:bg-accent-pink px-6 py-3 rounded-lg text-white font-medium transition-colors duration-300"
            >
                Login
            </button>
        </section>
    )
}
