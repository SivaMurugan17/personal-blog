import axios from "axios";
import { API_URL_TAG } from "../constants/env-variables";

export const loadTags = async()=>{
    const { data } = await axios.get(`${API_URL_TAG}`,{
        withCredentials : true
    })
    return data;
}