import BlogPreview from '../components/BlogPreview'
import axios from 'axios';
import { API_URL_BLOG } from '../constants/env-variables';
import { Blog } from '../constants/types';
import { Link } from 'react-router-dom';
import { BLACK_TAG, HEADING_H1 } from '../tailwind/tailwind-classes';
import { useQuery } from '@tanstack/react-query';
import { ColorRing } from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchBlogs from '../components/SearchBlogs';


const Home = () => {

  const [tags,setTags] = useState<string[]>([]);

  const fetchBlogs = async ()=>{
      const { data } = await axios.get(API_URL_BLOG,{
        withCredentials : true
      });
      return data;
  }

  const {data : blogs, isLoading, isError, error} = useQuery({
    queryKey : ['blogs'],
    queryFn : fetchBlogs
  })

  useEffect(()=>{
    let temp : string[]= [];
    blogs?.map((blog : Blog)=>{
      if(blog.tags?.length>0)temp = [...temp, ...blog.tags]
    })
    setTags(temp);
    console.log(temp)
  },[blogs])
  
  return (
    <div>
        <SearchBlogs/>
        <section className='flex flex-col gap-4 w-10/12 mx-auto'>
            <h1 className={`${HEADING_H1}`}>Recent Blogs</h1>
            {
              isError ? <p>{error.message}</p> :
              isLoading ? 
              <p>Loading..</p> :
              // <ColorRing 
              //   colors={['#fff','#fff','#fff','#fff','#fff']}
              //   height={50}
              //   width={50}/> :
              <div className='w-10/12 mx-auto flex flex-col gap-2'>
                {
                  blogs.map((blog : Blog, index : number)=>{
                    return (
                      <BlogPreview blog={blog}/>
                    )
                  })
                }
              </div>
            }
        </section>
        <section className='w-10/12 mx-auto'>
          <h1 className={`${HEADING_H1}`}>Tags</h1>
          <div className='max-w-xs'>
            {
              tags.map((tag : string)=>{
                return <span className={`${BLACK_TAG}`}>{tag}</span>
              })
            }
          </div>
        </section>
    </div>
  )
}

export default Home