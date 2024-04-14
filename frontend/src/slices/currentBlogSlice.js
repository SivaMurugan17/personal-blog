import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id : "",
    title : "",
    content : "",
    author : {
        name : ""   
    },
    date : null,
    tags : [],
    likedBy : [],
    comments : []
}

const currentBlogSlice = createSlice({
    name : 'blog',
    initialState,
    reducers : {
        setBlog : ( state, action )=>{
            const { id, title, content, author, date, tags, likedBy, comments} = action.payload;
            state.id = id;
            state.title = title;
            state.content = content;
            state.author = author;
            state.date = date;
            state.tags = tags;
            state.likedBy = likedBy;
            state.comments = comments;
        },
        setComments : ( state,action )=>{
            state.comments = action.payload;
        },
        setLikedBy : (state, action)=>{
            state.likedBy = action.payload;
        }
    }
})

export const { setBlog, setComments, setLikedBy } = currentBlogSlice.actions;

export default currentBlogSlice.reducer;