import Navbar from "./Navbar"
import "./styles.css"
import { useAuth } from "../../Context/AuthorizationContext"

export default function HomePage() {
    const currentUser = useAuth()
    console.log(currentUser.currentUser.uid)

    return (
        <div>
            <Navbar/>
            <h1> home</h1>
        </div>
    )
}