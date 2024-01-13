import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { API_URL_BLOG } from '../constants/env-variables';
import parse from 'html-react-parser';

const Blog = () => {
    const {id} = useParams();
    
    const [blog,setBlog] = useState({ title : "", authorEmail : "", content : "", date : ""});

    const fetchBlog = async()=>{
        try{
            const response = await axios.get(`${API_URL_BLOG}/${id}`);
            setBlog(response.data);
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
       fetchBlog();
    },[])
    
  return (
    <div className='flex flex-col gap-4 w-10/12 mx-auto p-4'>
        <h2 className='text-4xl text-left'>{blog.title}</h2>
        <p className='text-left italic'>{`- ${blog.authorEmail}`}</p>
        <p className='text-left'>{new Date(blog.date).toDateString()}</p>
        {parse(`${blog.content}`)}
    </div>
  )
}

export default Blog