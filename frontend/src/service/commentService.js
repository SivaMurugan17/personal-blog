import axios from "axios";
import { API_URL_COMMENT } from "../constants/env-variables";

export const addComment = async (blogId, text, userEmail) => {
    const { data } = await axios.post(`${API_URL_COMMENT}/${blogId}`, {
        text,
        commentedBy: userEmail
    }, {
        withCredentials: true
    })
    return data;
}

export const deleteComment = async (blogId, commentId) => {
    const { data } = await axios.delete(`${API_URL_COMMENT}?blogId=${blogId}&commentId=${commentId}`, {
        withCredentials: true
    })
    return data;
}