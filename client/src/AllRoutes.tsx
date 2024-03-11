import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Compiler } from "./pages/Compiler";
import { Loader } from "lucide-react";
import AllCodes from "./pages/AllCodes";
import MyCodes from "./pages/MyCodes";


// const Home = lazy(()=> import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Signup = lazy(() => import("./pages/Signup"));
// const Compiler= lazy(()=> import("./pages/Compiler"));


const AllRoutes = () => {
    return (
        <Suspense fallback={<div><Loader className="w-full h-[calc(100dvh-60px)] flex justify-center items-center" /></div>}>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/compiler" element={<Compiler />} /> */}
                <Route path="/compiler/:urlId?" element={<Compiler />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/all-codes" element={<AllCodes/>} />
                <Route path="/my-codes" element={<MyCodes/>} />
            </Routes>
        </Suspense>
    )
}

export default AllRoutes
