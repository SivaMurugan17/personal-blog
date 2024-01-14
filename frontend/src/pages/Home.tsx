import { useEffect, useState } from 'react'
import BlogPreview from '../components/BlogPreview'
import axios from 'axios';
import { API_URL_BLOG } from '../constants/env-variables';
import { Blog } from '../constants/types';
import { Link } from 'react-router-dom';

const Home = () => {
  const [blogs,setBlogs] = useState<Blog[]>([]); 

  const fetchBlogs = async ()=>{
    try{
      const response = await axios.get(API_URL_BLOG,{
        withCredentials : true
      });
      setBlogs(response.data);
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    fetchBlogs();
  },[])
  
  return (
    <div>
        <section className='flex flex-col gap-4 w-10/12 mx-auto'>
            <h1 className='text-3xl text-left'>Recent Blogs</h1>
            <div className='w-10/12 mx-auto flex overflow-x-auto'>
                {
                  blogs.map((blog : Blog, index)=>{
                    return (
                    <Link to={`/blog/${blog.id}`} key={index}>
                      <BlogPreview blog={blog}/>
                    </Link>
                    )
                  })
                }
            </div>
        </section>
    </div>
  )
}

export default Home