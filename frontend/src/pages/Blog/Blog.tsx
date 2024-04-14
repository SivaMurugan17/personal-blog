import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { State } from '../../constants/types';
import { useQuery } from '@tanstack/react-query';
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import BlogContent from './components/BlogContent';
import { fetchBlogById } from '../../service/blogService';

const Blog = () => {
    const {id} = useParams();

    const user = useSelector((state : State) => state.user.value);
    
    const [ allowEdit,setAllowEdit ] = useState(false);
    
    const {data : blog, isLoading, isError} = useQuery({
        queryKey : ['blog',id],
        queryFn : () => fetchBlogById(id)
    })

    useEffect(()=>{
        //to check the logged in user is same as blog author
       if(!isLoading && user?.email === blog.authorEmail){
            setAllowEdit(true);
       }
    },[user,blog,isLoading])
    
  return (
    <div className='flex flex-col gap-4 w-10/12 mx-auto p-4 max-w-2xl'>
        {
            isLoading ? 
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <p><Skeleton count={3} /></p>
            </SkeletonTheme>
            :
            <BlogContent blog={blog}/>
        }
    </div>
  )
}

export default Blog;