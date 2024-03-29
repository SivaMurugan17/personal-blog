import axios from 'axios';
import { useEffect, useState } from 'react'
import { API_URL_BLOG } from '../../constants/env-variables';
import { useSelector } from 'react-redux';
import { State, Blog } from '../../constants/types';
import BlogPreview from '../../components/BlogPreview';

const YourBlogs = () => {

    const user = useSelector((state : State) => state.user);

    const [blogs,setBlogs] = useState([]);

    const fetchYourBlogs = async()=>{
        try{
            const response = await axios.get(`${API_URL_BLOG}/author?email=${user.email}`,{
                withCredentials : true
            })
            setBlogs(response.data);
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        fetchYourBlogs();
    },[user])

  return (
    <div className='p-8'>
        <h2 className='text-4xl text-left my-4'>Your blogs</h2>
        {
            blogs.length === 0 && <p className='text-xl'>You have no blogs yet</p>
        }
        {
            blogs.map( (blog : Blog, index)  => {
                return <BlogPreview blog={blog} key={index}/>
            }) 
        }
    </div>
  )
}

export default YourBlogs