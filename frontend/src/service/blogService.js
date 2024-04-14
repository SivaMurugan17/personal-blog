import axios from "axios";
import { API_URL_BLOG } from "../constants/env-variables";

export const postBlog = async(blogPost)=>{
    const { data } = await axios.post(API_URL_BLOG, blogPost, {
        withCredentials: true
    });
    return data;
}

export const fetchBlogs = async()=>{
    const { data } = await axios.get(API_URL_BLOG,{
      withCredentials : true
    });
    return data;
}

export const fetchBlogById = async(blogId)=>{
    const { data } = await axios.get(`${API_URL_BLOG}/${blogId}`,{
        withCredentials : true
    });
    return data;
}

export const fetchBlogsByUserEmail = async(userEmail)=>{
    const { data } = await axios.get(`${API_URL_BLOG}/author?email=${userEmail}`,{
        withCredentials : true
    })
    return data;
}

export const searchBlogs = async (keyword) => {
    if(keyword.length === 0){
        return [];
    }
    const { data } = await axios.get(`${API_URL_BLOG}/search?title=${keyword}`,{
        withCredentials : true
    });
    return data;
}

export const likePost = async (userEmail, blogId) => {
    const { data } = await axios.post(`${API_URL_BLOG}/like?userEmail=${userEmail}&blogId=${blogId}`);
    console.log(data);
}

export const unlikePost = async (userEmail, blogId) => {
    const { data } = await axios.delete(`${API_URL_BLOG}/like?userEmail=${userEmail}&blogId=${blogId}`);
    console.log(data);
}