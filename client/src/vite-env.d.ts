/// <reference types="vite/client" />




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
