// import React from 'react'
import "./pageStyles/grid.css"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "@/redux/slices/api"
import { handleError } from "@/utils/handleError"
import { useDispatch } from "react-redux"
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice"

const formSchema = z.object({
    userId: z.string(),
    password: z.string(),
})

const Login = () => {
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId: "",
            password: "",
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {

            const res = await login(values).unwrap();
            console.log(res);
            dispatch(updateCurrentUser(res));
            dispatch(updateIsLoggedIn(true));
            navigate("/");
        }
        catch (err) {
            console.log("Login Error : ", err);
            handleError(err);
        }
    }
    return (
        <div className="__login grid-bg w-full h-[calc(100dvh-60px)] text-black flex justify-center flex-col items-center gap-3 mt-20">
            <div className="form-container backdrop-blur-[10px]  border-neutral-700 rounded-3xl py-8 px-8 flex flex-col gap-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h3 className="animate-charcter">Login</h3>
                        </div>
                    </div>
                </div>
                <p className="text-2xl text-white ">Welcome Back ReCode 🔃 </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white font-mono font-bold text-xl">Username</FormLabel>
                                    <FormControl >
                                        <Input disabled={isLoading} required placeholder="username or email " {...field} className="text-white font-mono font-bold" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white font-mono font-bold text-xl">UserPassword</FormLabel>
                                    <FormControl >
                                        <Input disabled={isLoading}
                                            type="password" required placeholder="password " {...field} className="text-white font-mono font-bold" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button loading={isLoading} className="bg-green-700 text-white hover:text-black" type="submit">Login</Button>
                    </form>
                </Form>
                <small className="text-white text-xl font-mono font-thin">Don't have an account? <Link className="text-blue-500" to='/signup'>Signup</Link></small>
            </div>
        </div>
    )
}

export default Login
