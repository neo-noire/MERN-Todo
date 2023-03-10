import { configureStore } from '@reduxjs/toolkit';
import authSlice from './fetures/auth/authSlice';
import todoSlice from './fetures/todos/todosSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        todos: todoSlice,
    }
})