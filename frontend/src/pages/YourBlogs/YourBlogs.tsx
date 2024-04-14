import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { State, Blog } from '../../constants/types';
import BlogPreview from '../../components/BlogPreview';
import { fetchBlogsByUserEmail } from '../../service/blogService';

const YourBlogs = () => {

    const user = useSelector((state : State) => state.user.value);

    const [blogs,setBlogs] = useState([]);

    const fetchYourBlogs = async()=>{
        fetchBlogsByUserEmail(user.email)
            .then((res)=>{
                console.log(res)
                setBlogs(res);
            })
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