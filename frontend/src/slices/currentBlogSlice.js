import { createSlice } from "@reduxjs/toolkit";


const currentBlogSlice = createSlice({
    name : 'blog',
    initialState : {
        value : null
    },
    reducers : {
        setBlog : ( state, action ) =>{
            state.value = action.payload;
        }
    }
})

export const { setBlog } = currentBlogSlice.actions;

export default currentBlogSlice.reducer;