import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { API_URL_BLOG } from '../constants/env-variables';
import parse from 'html-react-parser';
import { Blog } from '../constants/types';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';
import { State } from '../constants/types';
import QuillToolbar, { formats, modules } from '../components/QuillToolbar';

const BlogComponent = () => {
    const {id} = useParams();

    const user = useSelector((state : State) => state.user);
    
    const initialBlogState : Blog = {
        title : "",
        content : "",
        authorEmail : "",
        authorName : "",
        date : new Date(),
        tags : [],
        id : ""
    }
    const [blog,setBlog] = useState<Blog>(initialBlogState);
    const [allowEdit,setAllowEdit] = useState(false);

    const noToolbarModules = {
        toolbar: {
          container: false, 
        },
    };

    const fetchBlog = async()=>{
        try{
            const response = await axios.get(`${API_URL_BLOG}/${id}`,{
                withCredentials : true
            });
            setBlog(response.data);
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
       fetchBlog();
       if(user?.email === blog.authorEmail){
            setAllowEdit(true);
       }
    },[])
    
  return (
    <div className='flex flex-col gap-4 w-10/12 mx-auto p-4'>
        <h2 className='text-4xl text-left'>{blog.title}</h2>
        <p className='text-left italic'>{`- ${blog.authorName}`}</p>
        <p className='text-left'>{new Date(blog.date).toDateString()}</p>
        <QuillToolbar/> 
        <ReactQuill id='1'
            theme='snow' 
            value={blog.content}
            modules={modules}
            formats={formats}
            readOnly/>
    </div>
  )
}

export default BlogComponent;