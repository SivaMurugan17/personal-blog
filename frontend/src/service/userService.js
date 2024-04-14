import axios from "axios";
import { API_URL_AUTH, API_URL_AUTH_PROVIDER } from "../constants/env-variables";

export const loginUser = async(loginPayload)=>{
    const { data } = await axios.post(API_URL_AUTH+"/login",loginPayload,{
      withCredentials : true
    });
    return data;
}

export const registerUser = async(signupPayload)=>{
    const { data } = await axios.post(API_URL_AUTH+"/register",signupPayload,{
        withCredentials : true
    });
    return data;
}

export const loginWithGithub = ()=>{
    axios.get(`${API_URL_AUTH_PROVIDER}/github`)
       .then(res => console.log(res.data));
}

export const loginWithGoogle = ()=>{
    axios.get(`${API_URL_AUTH_PROVIDER}/google`)
        .then(res => console.log(res.data));
}

export const refreshUser = async()=>{
    const { data } = await axios.post(API_URL_AUTH+"/refresh",null,{
        withCredentials : true
    })
    return data;
}

export const logoutUser = ()=>{
    axios.post(API_URL_AUTH+"/logout",null,{
        withCredentials : true
    });
}