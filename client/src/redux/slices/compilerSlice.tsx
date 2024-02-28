import { PayloadAction, createSlice } from "@reduxjs/toolkit";




// interface ak object hai jo btata hai initialState ka Type iska use typeScript me Karte hai
export interface CompilerSliceInitialStateType {
    fullCode: {
        html: string
        css: string
        javascript: string
    };
    currentLanguage: "html" | "css" | "javascript";
    
}

const initialState: CompilerSliceInitialStateType = {
    fullCode: {
        html: `<html lang="en">
        <body>
             <h1>Hello, World!</h1>
             <p>Deepak Kumar</p>
             <button id="clickMe">Click Me!</button>
             <script src="script.js"></script>
           
         </body>
</html>`,
        css:`body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        }
      h1 {
          color: #333;
          }
      button {
               padding: 10px 20px;
               background-color: #007bff;
               color: #fff;
               border: none;
               border-radius: 5px;
               cursor: pointer;
              }
      button:hover {
                  background-color: #0056b3;
        }
          `,
        javascript: `document.getElementById('clickMe').addEventListener('click', function() {
            alert('Button clicked!');
          });
          `,
    },

    currentLanguage: "html",
    
}

const compilerSlice = createSlice({
    name: "compilerSlice",
    initialState,
    reducers: {
        updateCurrentLanguage: (state, action: PayloadAction<CompilerSliceInitialStateType["currentLanguage"]>) => {
            console.log("Actions", action)

            state.currentLanguage = action.payload;
        },
        updateCodeValue : (state,action:PayloadAction<string>)=>{
            state.fullCode[state.currentLanguage] = action.payload;
        }
        
        
    },

})
export default compilerSlice.reducer;
export const { updateCurrentLanguage,updateCodeValue } = compilerSlice.actions;
