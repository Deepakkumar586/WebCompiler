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
import { handleError } from "@/utils/handleError"
import { useSignupMutation } from "@/redux/slices/api"
import { useDispatch } from "react-redux"
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice"

const formSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string()
})

const Signup = () => {
    const [signup,{isLoading}] = useSignupMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
            try{
                const res = await signup(values).unwrap();
                console.log(res);
                dispatch(updateCurrentUser(res));
                // dispatch(updateIsLoggedIn(true));
                navigate('/login')
            }
            catch(error){
                console.log("Signup CLient Side",error)
                handleError(error);
            }

        console.log(values)
    }
    return (
        <div className="__login grid-bg w-full h-[calc(100dvh-60px)] text-black flex justify-center flex-col items-center gap-3">
            <div className="form-container backdrop-blur-[10px] border-[1px] border-neutral-700 rounded-3xl py-8 px-8 flex flex-col gap-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h3 className="animate-charcter">Signup</h3>
                        </div>
                    </div>
                </div>
                <p className="text-2xl text-white ">Join the Community of Expert Developers... </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white font-mono font-bold text-xl">UserName</FormLabel>
                                    <FormControl >
                                        <Input disabled={isLoading} type="text" placeholder="username " {...field} className="text-white font-mono font-bold" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white font-mono font-bold text-xl">UserEmail</FormLabel>
                                    <FormControl >
                                        <Input disabled={isLoading} type="email" placeholder="email " {...field} className="text-white font-mono font-bold" />
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
                                        <Input disabled={isLoading} type="password"  placeholder="password " {...field} className="text-white font-mono font-bold" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button loading={isLoading} className="bg-green-900 text-white hover:text-black" type="submit">Signup</Button>
                    </form>
                </Form>
                <small className="text-white text-xl font-mono font-thin">Already have an account? <Link className="text-blue-500" to='/login'>Login</Link></small>
            </div>
        </div>
    )
}

export default Signup
