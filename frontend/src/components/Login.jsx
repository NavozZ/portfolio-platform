import {
useState
}
from "react"

import axios from "axios"

export default function Login(){

const[
email,
setEmail
]=
useState("")

const[
password,
setPassword
]=
useState("")

const submit=
async()=>{

try{

const res=
await axios.post(

`${import.meta.env.VITE_API_URL}/auth/login`,

{
email,
password
}

)

localStorage.setItem(

"token",

res.data.token

)

window.location.reload()

}

catch{

alert(
"Invalid Credentials"
)

}

}

return(

<section
className="
min-h-screen

max-w-xl

mx-auto

py-32
"

>

<h2
className="
text-4xl
mb-8
"
>

Admin Login

</h2>

<input

placeholder="Email"

onChange={(e)=>

setEmail(
e.target.value
)

}

className="
w-full
p-4
mb-4
bg-white/10
"

>

</input>

<input

type="password"

placeholder="Password"

onChange={(e)=>

setPassword(
e.target.value
)

}

className="
w-full
p-4
mb-4
bg-white/10
"

>

</input>

<button

onClick={submit}

className="
bg-purple-600

px-6
py-3

rounded
"

>

Login

</button>

</section>

)

}
