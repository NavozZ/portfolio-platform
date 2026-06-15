export default function Navbar() {

    return (

        <nav
            className="
fixed
w-full
top-0
z-50
bg-[#050816]
flex
justify-between
p-6
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

    )

}