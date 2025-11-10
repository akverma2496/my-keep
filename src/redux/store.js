import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import noteReducer from "./slices/noteSlice";
import themeReducer from "./slices/themeSlice"

const store = configureStore({
    reducer : { auth: authReducer , category: categoryReducer, note: noteReducer, theme : themeReducer }
})

export default store