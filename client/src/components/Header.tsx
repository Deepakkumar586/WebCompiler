import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import './button.css'


const Header = () => {
    return (
        <nav className=" w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
            <Link to="/"><h2 className="font-bold  font-serif text-2xl select-none">
                WebGenius
            </h2></Link>
            <ul className="flex gap-2">
                <li>
                    <Link to="/compiler"><Button variant="ghost">Compiler</Button></Link>
                </li>
                <li>
                    <Link to="/login"><Button variant="ghost"><span>Login</span></Button></Link>
                </li>
                <li>
                <Link to="/signup"><Button variant="ghost"><span>Signup</span></Button></Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header
