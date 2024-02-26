import { PayloadAction, createSlice } from "@reduxjs/toolkit";


// interface ak object hai jo btata hai initialState ka Type iska use typeScript me Karte hai
export interface CompilerSliceInitialStateType {
    html:string
    css:string
    javascript:string
    currentLanguage:"html" | "css" | "javascript";
}

const initialState:CompilerSliceInitialStateType = {
    html:"",
    css:"",
    javascript:"",
    currentLanguage:"html",
    
}

const compilerSlice  = createSlice({
    name:"compilerSlice",
    initialState,
    reducers:{
        updateCurrentLanguage:(state,action:PayloadAction<CompilerSliceInitialStateType["currentLanguage"]>)=>{
            console.log("Actions",action)
            
            state.currentLanguage = action.payload;
        }
    },

})
export default compilerSlice.reducer;
export const {updateCurrentLanguage} = compilerSlice.actions;
