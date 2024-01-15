import { useEffect, useState } from 'react'
import BlogPreview from '../components/BlogPreview'
import axios from 'axios';
import { API_URL_BLOG } from '../constants/env-variables';
import { Blog } from '../constants/types';
import { Link } from 'react-router-dom';
import { HEADING_H1 } from '../tailwind/tailwind-classes';

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
            <h1 className={`${HEADING_H1}`}>Recent Blogs</h1>
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
        <section className='w-10/12 mx-auto'>
          <h1 className={`${HEADING_H1}`}>Tags</h1>
        </section>
    </div>
  )
}

export default Home