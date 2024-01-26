import BlogPreview from '../components/BlogPreview'
import axios from 'axios';
import { API_URL_BLOG } from '../constants/env-variables';
import { Blog } from '../constants/types';
import { Link } from 'react-router-dom';
import { HEADING_H1 } from '../tailwind/tailwind-classes';
import { useQuery } from '@tanstack/react-query';
import { ColorRing } from 'react-loader-spinner';


const Home = () => {

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
  
  return (
    <div>
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
              <div className='w-10/12 mx-auto flex overflow-x-auto'>
                {
                  blogs.map((blog : Blog, index : number)=>{
                    return (
                    <Link to={`/blog/${blog.id}`} key={index}>
                      <BlogPreview blog={blog}/>
                    </Link>
                    )
                  })
                }
              </div>
            }
        </section>
        <section className='w-10/12 mx-auto'>
          <h1 className={`${HEADING_H1}`}>Tags</h1>
        </section>
    </div>
  )
}

export default Home