import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";


const initialState = {
    todos: [],
    loading: false,
    error: null,
}

export const createTodo = createAsyncThunk('/todo/createTodo',
    async (params) => {
        try {
            const { data } = await axios.post('/todo', params)

            return data
        } catch (error) {

        }
    })

export const deleteTodo = createAsyncThunk('deleteTodo',
    async (params) => {

        const { data } = await axios.put('/todo/delete', params)

        return data
    })

export const addTasks = createAsyncThunk('/tasks',
    async (params) => {
        const { data } = await axios.post('/tasks', params)

        return data
    })

export const deleteTasks = createAsyncThunk('/deleteTasks',
    async (params) => {

        const { data } = await axios.put('/tasks/delete', params)
        return data
    })

export const updateTaskStatus = createAsyncThunk('/tasks/update',
    async (params) => {
        const { data } = await axios.post('/tasks/update', params)


        return data
    })

export const editTaskText = createAsyncThunk('/tasks/edit',
    async (params) => {
        const { data } = await axios.post('/tasks/edit', params)

        return data
    })


export const getTodos = createAsyncThunk('todo/getTodos',
    async () => {
        try {
            const { data } = await axios.get('/todo/get')
            // const { tasks } = await axios.get('/todo/tasks/get')
            return data
        } catch (error) {

        }
    }
)






export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: {
        // Create todos titles
        [createTodo.pending]: (state) => {
            state.loading = true
        },
        [createTodo.fulfilled]: (state, action) => {
            state.loading = false
            Array.from(state.todos).push(action.payload.newTodo)

        },
        [createTodo.rejected]: (state) => {
            state.loading = false
        },

        // Get todos titles
        [getTodos.pending]: (state) => {
            state.loading = true
        },
        [getTodos.fulfilled]: (state, action) => {
            state.loading = false

            state.todos = action.payload
        },
        [getTodos.rejected]: (state) => {
            state.loading = false
        },
        //Create Tasks
        [addTasks.pending]: (state) => {
            state.loading = true
        },
        [addTasks.fulfilled]: (state, action) => {
            state.loading = false
            Array.from(state.todos).push(action.payload.newTodo)
        },
        [addTasks.rejected]: (state) => {
            state.loading = false
        },
        //Delete Tasks
        [deleteTasks.pending]: (state) => {
            state.loading = true
        },
        [deleteTasks.fulfilled]: (state, action) => {
            state.loading = false;
            state.todos.todos = action.payload.updatedTodo
        },
        [deleteTasks.rejected]: (state) => {
            state.loading = false
        },

        //Update Task Status
        [updateTaskStatus.pending]: (state) => {
            state.loading = true
        },
        [updateTaskStatus.fulfilled]: (state, action) => {
            state.loading = false
            state.todos.todos = state.todos.todos.map(el =>
                el._id === action.payload.updatedTasks._id
                    ? action.payload.updatedTasks
                    : el)
        },
        [updateTaskStatus.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },

        //Edit Task Text
        [editTaskText.pending]: (state) => {
            state.loading = true
        },
        [editTaskText.fulfilled]: (state, action) => {
            state.loading = false
            state.todos.todos = state.todos.todos.map(el =>
                el._id === action.payload.updatedTasks._id
                    ? action.payload.updatedTasks
                    : el)
        },
        [editTaskText.rejected]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },

        //Delete Todo
        [deleteTodo.pending]: (state) => {
            state.loading = true
        },
        [deleteTodo.fulfilled]: (state, action) => {
            state.loading = false
            state.todos = action.payload.todos
        },
        [deleteTodo.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default todoSlice.reducer