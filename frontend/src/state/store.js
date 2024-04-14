import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice';
import blogReducer from '../slices/currentBlogSlice'

export const store = configureStore({
    reducer : {
        user : userReducer,
        blog : blogReducer
    }
})