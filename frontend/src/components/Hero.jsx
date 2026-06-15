import { motion } from "framer-motion"

export default function Hero() {

    return (

        <section
            className="
min-h-screen
flex
items-center
justify-center
px-8
"
        >

            <div className="text-center">

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
gap-4
justify-center
"
                >

                    <button
                        className="
bg-purple-600
px-8
py-3
rounded-xl
"
                    >

                        View Projects

                    </button>

                    <button
                        className="
border
px-8
py-3
rounded-xl
"
                    >

                        Download CV

                    </button>

                </div>

            </div>

        </section>

    )

}