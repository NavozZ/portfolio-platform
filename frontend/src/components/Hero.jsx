import { motion } from "framer-motion"

export default function Hero() {

    return (

        <section
            className="
min-h-screen
flex
items-center
justify-center
pt-32
max-w-7xl
mx-auto
px-6
"
        >

            <div
                className="
max-w-3xl
mx-auto
text-center
"
            >
                <div className="text-center space-y-6">

                    <motion.h1

                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}

                        transition={{
                            duration: 1
                        }}

                        className="
text-6xl
font-bold
"
                    >

                        Navodya
                        <span className="text-purple-500">

                            Theshan

                        </span>

                    </motion.h1>

                    <motion.p

                        initial={{ opacity: 0 }}

                        animate={{ opacity: 1 }}

                        transition={{
                            delay: .5
                        }}

                        className="
mt-6
text-2xl
text-gray-300
"
                    >

                        Aspiring DevOps Engineer

                    </motion.p>

                    <p className="mt-2">

                        Full-Stack Developer • Cloud Enthusiast

                    </p>

                    <div
                        className="
mt-10
flex
justify-center
gap-6
flex-wrap
"
                    >

                        <button
                            className="
bg-purple-600
hover:bg-purple-700
hover:scale-105
duration-300

px-8
py-4

rounded-xl
"
                        >

                            View Projects

                        </button>

                        <button
                            className="
border
border-white/30

hover:bg-white
hover:text-black

duration-300

px-8
py-4

rounded-xl
"
                        >

                            Download CV

                        </button>

                    </div>

                </div>
            </div>

        </section>

    )

}