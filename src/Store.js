import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from './Todoslice'

export const Store =configureStore({
    reducer:{
        Todo: TodoReducer,
    },
})