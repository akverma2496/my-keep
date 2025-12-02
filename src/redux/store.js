import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import noteReducer from "./slices/noteSlice";
import themeReducer from "./slices/themeSlice";
import searchReducer from "./slices/searchSlice";

const store = configureStore({
    reducer : { auth: authReducer, 
                category: categoryReducer, 
                note: noteReducer, 
                theme : themeReducer,
                search: searchReducer 
            }
})

export default store