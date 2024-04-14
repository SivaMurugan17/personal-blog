import { createSlice } from "@reduxjs/toolkit";


const currentBlogSlice = createSlice({
    name : 'blog',
    initialState : {
        value : null,
        comments : []
    },
    reducers : {
        setBlog : ( state, action )=>{
            state.value = action.payload;
        },
        setComments : ( state,action )=>{
            state.comments = action.payload;
        }
    }
})

export const { setBlog, setComments } = currentBlogSlice.actions;

export default currentBlogSlice.reducer;