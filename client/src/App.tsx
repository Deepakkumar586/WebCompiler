import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import { Home } from "./pages/Home"
import { Compiler } from "./pages/Compiler"
import NotFound from "./pages/NotFound"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { useEffect } from "react"
import { useGetUserDetailsQuery } from "./redux/slices/api"
import { useDispatch } from "react-redux"
import { updateCurrentUser, updateIsLoggedIn } from "./redux/slices/appSlice"
function App() {




  const { data, error } = useGetUserDetailsQuery();
  const dispatch = useDispatch();

  useEffect(() => {

    if (data) {
      dispatch(updateCurrentUser(data));
      dispatch(updateIsLoggedIn(true));
    }
    else if(error) {
      dispatch(updateCurrentUser({}));
      dispatch(updateIsLoggedIn(false));
    }

    // console.log("isSuccess", isSuccess);
  }, [data, error])
  return (
    <>
      <Toaster position="bottom-right" theme="dark" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/compiler" element={<Compiler />} /> */}
          <Route path="/compiler/:urlId?" element={<Compiler />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </ThemeProvider>


    </>
  )
}

export default App
