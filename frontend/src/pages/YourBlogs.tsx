import axios from 'axios';
import { useEffect, useState } from 'react'
import { API_URL_BLOG } from '../constants/env-variables';
import { useSelector } from 'react-redux';
import { State, Blog } from '../constants/types';
import BlogPreview from '../components/BlogPreview';

const YourBlogs = () => {

    const user = useSelector((state : State) => state.user);

    const [blogs,setBlogs] = useState([]);

    const fetchYourBlogs = async()=>{
        try{
            const response = await axios.get(`${API_URL_BLOG}/author/${user.email}`)
            setBlogs(response.data);
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        fetchYourBlogs();
    },[])

  return (
    <div className='p-8'>
        <h2 className='text-4xl text-left my-4'>Your blogs</h2>
        {
            blogs.map( (blog : Blog)  => {
                return <BlogPreview title={blog.title} author={blog.authorEmail}/>
            }) 
        }
    </div>
  )
}

export default YourBlogs