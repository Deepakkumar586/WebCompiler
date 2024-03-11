import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CompilerSliceInitialStateType } from './compilerSlice'
import { codeType, loginCredentialsType, signupCredentialsType, userInfoType } from '@/vite-env';


export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2000",
        credentials: "include",
    }),

    // this is global tags in RTK Query State
    tagTypes: ["myCodes"],

    endpoints: (builder) => ({


        // for save code
        saveCode: builder.mutation<{ url: string, status: string },codeType>({
            query: (fullCode) => {
                return {


                    url: "/compiler/save",
                    method: "POST",
                    body: fullCode,
                };
            },


            // rwhen code save then all cache reset  ---->> page refresh ki neerd nhi padegi 
            invalidatesTags: ["myCodes"],
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
        signup: builder.mutation<userInfoType, signupCredentialsType>({
            query: (body) => ({
                url: "/auth/signup",
                method: "POST",
                body: body
            })
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
        }),
        getUserDetails: builder.query<userInfoType, void>({
            query: () => ({ url: "/auth/user-details", cache: "no-store" }),
        }),


        /* <> inside this  angle we pass typeScript code --->>> which means what we take result to bakckend and what  we give as a output-->>void means we are not give any things */
        getMyCodes: builder.query<Array<codeType>, void>({
            query: () => "/auth/my-codes",
            providesTags: ["myCodes"],
        }),

        deleteCode:builder.mutation<void,string>({
            query: (_id) => ({
                url: `/compiler/delete/${_id}`,
                method: "DELETE",
                body: _id,
            }),
            invalidatesTags: ["myCodes"],
        })
    }),



})

export const { useSaveCodeMutation, useLoadCodeMutation, useLoginMutation, useLogoutMutation, useGetUserDetailsQuery, useSignupMutation, useGetMyCodesQuery,useDeleteCodeMutation} = api

// mutation wale array destructuring karte hai
// query wale object destructuring