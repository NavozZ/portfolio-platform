export default function Navbar() {

    return (
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
            <nav

                className="

fixed
top-0
w-full

backdrop-blur-md

bg-black/20

border-b

border-white/10

z-50

"

            >

                <h1
                    className="
text-purple-400
font-bold
"
                >

                    NT

                </h1>

                <div className="flex gap-8">

                    <a href="#">

                        About

                    </a>

                    <a href="#">

                        Projects

                    </a>

                    <a href="#">

                        Contact

                    </a>

                </div>

            </nav>
        </div>
    )

}