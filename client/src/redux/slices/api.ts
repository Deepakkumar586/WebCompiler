import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CompilerSliceInitialStateType } from './compilerSlice'
import { codeType, loginCredentialsType, signupCredentialsType, userInfoType } from '@/vite-env';


export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2000",
        credentials: "include",
    }),

    // this is global tags in RTK Query State
    tagTypes: ["myCodes", "allCodes"],

    endpoints: (builder) => ({


        // for save code
        saveCode: builder.mutation<{ url: string, status: string }, codeType>({
            query: (fullCode) => {
                return {


                    url: "/compiler/save",
                    method: "POST",
                    body: fullCode,
                };
            },


            // rwhen code save then all cache reset  ---->> page refresh ki neerd nhi padegi 
            invalidatesTags: ["myCodes", "allCodes"],
        }),

        // for Load Code
        loadCode: builder.mutation<{ fullCode: CompilerSliceInitialStateType["fullCode"], isOwner: boolean }, { urlId: string }>({
            query: (body) => ({
                url: "/compiler/load",
                method: "POST",
                body: body,
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

        deleteCode: builder.mutation<void, string>({
            query: (_id) => ({
                url: `/compiler/delete/${_id}`,
                method: "DELETE",
                body: _id,
            }),
            invalidatesTags: ["myCodes", "allCodes"],
        }),

        // edit post
        editPost: builder.mutation<void, { fullCode: CompilerSliceInitialStateType["fullCode"]; id: string }>({
            query: ({ fullCode, id }) => ({
                url: `/compiler/edit/${id}`,
                method: "PUT",
                body: fullCode,
            }),
            invalidatesTags: ["myCodes"],
        }),


        // get all codes
        getAllCodes: builder.query<Array<{ _id: string, title: string, ownerName: string }>, void>({
            query: () => ({
                url: "/compiler/all-codes",
                cache: "no-store"
            }),
            providesTags: ["allCodes"],


        }),
    }),



})

export const { useSaveCodeMutation, useLoadCodeMutation, useLoginMutation, useLogoutMutation, useGetUserDetailsQuery, useSignupMutation, useGetMyCodesQuery, useDeleteCodeMutation, useEditPostMutation, useGetAllCodesQuery } = api

// mutation wale array destructuring karte hai
// query wale object destructuring