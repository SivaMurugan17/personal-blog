import { State } from '../../constants/types';
import axios from 'axios';
import { API_URL_BLOG } from '../../constants/env-variables';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import QuillToolbar, { modules } from '../../components/QuillToolbar';
import { formats } from '../../components/QuillToolbar';
import './NewBlog.css';
import { BLACK_BUTTON, BLACK_TAG } from '../../constants/tailwind-classes';

const NewBlog = () => {

  const [blogContent,setBlogContent] = useState("");
  const [title,setTitle] = useState("");
  const [tag,setTag] = useState("");
  const [tags,setTags] = useState<string[]>([]);
  const user = useSelector((state : State)=> state.user);

  const navigate = useNavigate();

  const handleAddTag = ()=>{
    setTags([...tags,tag])
    setTag("");
  }

  const handleRemoveTag = (tagName : string)=>{
    setTags(tags.filter(singleTag => singleTag !== tagName))
  }

  const onSubmit = async ()=>{
    try{
      const blogPost = { 
        title : title, 
        content : blogContent, 
        authorEmail : user.email,
        authorName: user.name,
        date : new Date(),
        tags: tags
      };
      const response = await axios.post(API_URL_BLOG,blogPost,{
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
    <div className='w-4/5 mx-auto'>
        <QuillToolbar/>

        <div className='textpad my-4 max-w-2xl mx-auto'>
          <section className='flex p-4'>
            <input className='text-3xl outline-none font-medium'
              placeholder='Title..'  
              onChange={(e)=>setTitle(e.target.value)}/>
            <button className={`${BLACK_BUTTON} ms-auto`}
              onClick={onSubmit}>
                Save
            </button>
          </section>

          <section className='flex p-4 gap-2'>
            <h3 className='text-xl'>Tags:</h3>
            {
              tags.map((tagName,i)=>{
                return (
                  <span className={`${BLACK_TAG}`} key={i}>
                    {tagName} <button onClick={()=>handleRemoveTag(tagName)}>x</button>
                  </span>
                )
              })
            }
            <input className='border-2 border-slate-300 outline-none rounded-lg p-1' 
              onChange={(e)=>setTag(e.target.value)}
              value={tag}/>
            <button className={`${BLACK_BUTTON}`} onClick={handleAddTag}>Add</button>
          </section>

          <ReactQuill id='1'
            theme='snow' 
            value={blogContent} 
            onChange={setBlogContent}  
            formats={formats} 
            modules={modules}/>
        </div>
    </div>
  )
}

export default NewBlog