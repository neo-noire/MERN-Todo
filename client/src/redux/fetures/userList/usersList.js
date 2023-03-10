import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    
}


export const getMe = createAsyncThunk('auth/getMe', async () => {
    try {
        const { data } = await axios.get('/auth/me')
        return data
    } catch (error) {
        console.log(error);
        return error
    }
})



export const usersListSlice = createSlice({
    name: 'usersList',
    initialState,
    reducers: {
        logout: (state) => {
            state.email = null
            state.token = null
            state.isLoading = false
            state.status = null
        }
    },
    extraReducers: {
        //Auth check
        [getMe.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.email = action.payload?.email
            state.token = action.payload?.token
        },
        [getMe.rejected]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
        },
    }
})

export default usersListSlice.reducer