import axios from "axios"
import BlogPreview from "../../../components/BlogPreview"
import { HEADING_H1 } from "../../../constants/tailwind-classes"
import { Blog } from "../../../constants/types"
import { API_URL_BLOG } from "../../../constants/env-variables"
import { useQuery } from "@tanstack/react-query"



const RecentBlogs = () => {
    const fetchBlogs = async ()=>{
        const { data } = await axios.get(API_URL_BLOG,{
          withCredentials : true
        });
        return data;
    }
  
    const {data : blogs, isPending, isError, error} = useQuery({
      queryKey : ['blogs'],
      queryFn : fetchBlogs
    })
  return (
    <section className='flex flex-col gap-4 w-10/12 mx-auto'>
        <h1 className={`${HEADING_H1}`}>Recent Blogs</h1>
        {
            isError ? <p>{error.message}</p> :
            isPending ? 
            <p>Loading..</p> :
            <div className='w-10/12 mx-auto flex flex-col gap-2'>
            {
                blogs.map((blog : Blog, index : number)=>{
                return (
                    <BlogPreview blog={blog} key={index}/>
                )
                })
            }
            </div>
        }
    </section>
  )
}

export default RecentBlogs