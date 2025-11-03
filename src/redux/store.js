import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import noteReducer from "./slices/noteSlice";

const store = configureStore({
    reducer : { auth: authReducer , category: categoryReducer, note: noteReducer }
})

export default store