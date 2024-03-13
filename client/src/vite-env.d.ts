/// <reference types="vite/client" />

import { CompilerSliceInitialStateType } from "./redux/slices/compilerSlice";




// types User ---->>. Interface
interface userInfoType {
    username: string;
    picture: string;
    email: string;
    savedCodes: Array<string>;
}

interface loginCredentialsType{
    userId:string;
    password:string;
}

// signup credentials
interface signupCredentialsType{
    username:string
    email:string
    password:string
}


interface codeType{
     fullCode?: CompilerSliceInitialStateType["fullCode"];
     title: string ;
     _id?:string

}