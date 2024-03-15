import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { API_URL_BLOG } from '../../constants/env-variables';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';
import { State } from '../../constants/types';
import { formats, modules } from '../../components/QuillToolbar';
import { useQuery } from '@tanstack/react-query';
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import CommentSection from './components/CommentSection';

const Blog = () => {
    const {id} = useParams();

    const user = useSelector((state : State) => state.user);
    
    const [ allowEdit,setAllowEdit ] = useState(false);
    

    const fetchBlog = async()=>{
        const { data } = await axios.get(`${API_URL_BLOG}/${id}`,{
            withCredentials : true
        });
        return data;
    }

    const {data : blog, isLoading, isError} = useQuery({
        queryKey : ['blog'],
        queryFn : fetchBlog
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
                <p>
                <Skeleton count={3} />
                </p>
            </SkeletonTheme>
            :
            <>
                <section className='sticky top-0 bg-white z-10 py-4'>
                    <h2 className='text-4xl text-left'>{blog.title}</h2>
                </section>
                <section className='flex gap-2'>
                    <p className='text-left italic'>{`- ${blog.author.name}`} |</p>
                    <p className='text-left'>{new Date(blog.date).toDateString()}</p>
                </section>
                {/* <QuillToolbar/>  */}
                <div id='toolbar'></div>
                <ReactQuill id='1'
                    theme='snow' 
                    value={blog.content}
                    modules={modules}
                    formats={formats}
                    readOnly/>
                <CommentSection blog={blog}/>
            </>
        }
    </div>
  )
}

export default Blog;