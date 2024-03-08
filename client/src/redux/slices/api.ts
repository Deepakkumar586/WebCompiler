import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CompilerSliceInitialStateType } from './compilerSlice'


export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2000",
        credentials: "include",
    }),
    endpoints: (builder) => ({


        // for save code
        saveCode: builder.mutation<{ url: string, status: string }, CompilerSliceInitialStateType["fullCode"]>({
            query: (fullCode) => {
                return {


                    url: "/compiler/save",
                    method: "POST",
                    body: fullCode,
                };
            },
        }),

        // for Load Code
        loadCode: builder.mutation<{ fullCode: CompilerSliceInitialStateType["fullCode"] }, { urlId: string }>({
            query: ({ urlId }) => ({
                url: "/compiler/load",
                method: "POST",
                body: urlId,
            })
        }),



        // check-vite-env.d.ts file----no need for import
        login: builder.mutation<userInfoType, loginCredentialsType>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body: body,
                credentials: "include",
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            })
        })
    })
})

export const { useSaveCodeMutation, useLoadCodeMutation, useLoginMutation, useLogoutMutation } = api