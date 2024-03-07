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

const formSchema = z.object({
    userId: z.string(),
    password: z.string(),
})

const Login = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId: "Deepak Kumar",
            password: "deep",
        },
    })


    function onSubmit(values: z.infer<typeof formSchema>) {


        console.log(values)
    }
    return (
        <div className="__login grid-bg w-full h-[calc(100dvh-60px)] text-black flex justify-center flex-col items-center gap-3">
            <div className="form-container backdrop-blur-[10px] border-[1px] border-neutral-700 rounded-3xl py-8 px-8 flex flex-col gap-3">
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
                                        <Input placeholder="username or email " {...field} className="text-white font-mono font-bold" />
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
                                        <Input placeholder="password " {...field} className="text-white font-mono font-bold" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="bg-gray-600 text-white hover:text-black" type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login