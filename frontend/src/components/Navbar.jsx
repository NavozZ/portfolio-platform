export default function Navbar() {

    return (

        <nav
            className="

fixed
top-0
left-0

w-full

z-50

backdrop-blur-md
bg-black/20

border-b
border-white/10

"

        >

            <div
                className="

max-w-7xl
mx-auto

flex
justify-between
items-center

px-8
py-5

"

            >

                <h1
                    className="

text-purple-400
font-bold
text-2xl

"

                >

                    NT

                </h1>

                <div
                    className="
flex
gap-8
"
                >

                    <a href="#about">

                        About

                    </a>

                    <a href="#skills">

                        Skills

                    </a>

                    <a href="#projects">

                        Projects

                    </a>

                    <a href="#contact">

                        Contact

                    </a>

                </div>

            </div>

        </nav>

    )

}