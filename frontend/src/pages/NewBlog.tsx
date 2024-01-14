import { BlogPayload, State } from '../constants/types';
import axios from 'axios';
import { API_URL_BLOG } from '../constants/env-variables';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import QuillToolbar, { modules } from '../components/QuillToolbar';
import { formats } from '../components/QuillToolbar';
import '../css/NewBlog.css';

const NewBlog = () => {

  const [blogContent,setBlogContent] = useState("");
  const [title,setTitle] = useState("");
  const user = useSelector((state : State)=> state.user);

  const navigate = useNavigate();

  const onSubmit = async (data : BlogPayload)=>{
    try{
      console.log(data);
      const response = await axios.post(API_URL_BLOG,{...data,authorEmail :user.email, date : new Date()},{
        withCredentials : true
      });
      if(response.data){
        //successfully posted
        console.log("Successfully posted");
        navigate('/your-blogs')
      }
      else{
        //some error occured
        console.log("Some error occurred");
      }
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <div>
      <section className='w-4/5 mx-auto'>
        <QuillToolbar/>

        <div className='textpad my-4'>
          <div className='flex w-4/5 mx-auto py-4'>
            <input className='text-3xl outline-none font-medium'
              placeholder='Title..'  
              onChange={(e)=>setTitle(e.target.value)}/>
            <button className='bg-black text-white py-1 rounded-lg px-4 ms-auto' 
              onClick={()=>onSubmit({ title : title, content : blogContent, authorEmail : ""})}>
                Save
            </button>
          </div>

          <ReactQuill id='1'
            theme='snow' 
            value={blogContent} 
            onChange={setBlogContent}  
            formats={formats} 
            modules={modules}/>
        </div>
      </section>
    </div>
  )
}

export default NewBlog