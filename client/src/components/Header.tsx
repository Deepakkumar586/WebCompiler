import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import './button.css'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { handleError } from "@/utils/handleError"
import { useLogoutMutation } from "@/redux/slices/api"
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"


const Header = () => {
    const [logout, { isLoading }] = useLogoutMutation();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.appSlice.isLoggedIn)
    const currentUser  = useSelector((state:RootState)=>state.appSlice.currentUser);

    async function handleLogout() {
        try {

            await logout().unwrap();
            dispatch(updateIsLoggedIn(false));
            dispatch(updateCurrentUser({}));

        }
        catch (err) {
            console.log("Logout Client Side Problem", err);
            handleError(err);
        }
    }
    return (
        <nav className=" w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
            <Link to="/"><h2 className="font-bold  font-serif text-2xl select-none">
                WebGenius
            </h2></Link>
            <ul className="flex gap-2">
                <li>
                    <Link to="/compiler"><Button variant="ghost">Compiler</Button></Link>
                </li>
                {
                    isLoggedIn ? (<>
                        <li>
                            <Button onClick={handleLogout} loading={isLoading} variant="destructive">Logout</Button>
                        </li>
                        <li>
                            <Avatar>
                                <AvatarImage src={currentUser.picture} />
                                <AvatarFallback className="capitalize">{currentUser.username?.slice(0,2)}</AvatarFallback>
                            </Avatar>
                        </li>
                    </>) : (<>
                        <li>
                            <Link to="/login"><Button variant="green">Login</Button></Link>
                        </li>
                        <li>
                            <Link to="/signup"><Button variant="green">Signup</Button></Link>
                        </li></>)
                }

            </ul>
        </nav>
    )
}

export default Header
