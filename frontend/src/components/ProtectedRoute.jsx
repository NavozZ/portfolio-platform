export default function ProtectedRoute({

children

}){

const token=

localStorage.getItem(
"token"
)

if(!token){

return(

<div
className="
min-h-screen
flex
justify-center
items-center
"

>

<h1>

Access Denied

</h1>

</div>

)

}

return children

}
