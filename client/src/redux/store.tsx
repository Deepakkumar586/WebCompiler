import { configureStore } from "@reduxjs/toolkit";
import compilerSlice from "./slices/compilerSlice";
import { api } from "./slices/api";
import appSlice from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    compilerSlice,
    appSlice,

  },



  // jo exist middleware the unko add/concat kar diya jo api khud bnayi gyi hai unke sath me concat kar diya gya
  // defaultmiddleware ak array type ka hai 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware
  )
})

export type RootState = ReturnType<typeof store.getState>;
