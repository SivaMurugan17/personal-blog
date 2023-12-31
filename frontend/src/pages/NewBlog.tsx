import { useForm } from 'react-hook-form'
import { BlogPayload, State } from '../constants/types';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { API_URL_BLOG } from '../constants/env-variables';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useState } from 'react';

const NewBlog = () => {

  const [blogContent,setBlogContent] = useState("");

  const user = useSelector((state : State)=> state.user);

  // const navigate = useNavigate();

  // const blogSchema = object({
  //   title : string().required(),
  //   content : string().required(),
  //   authorEmail : string().email().required(),
  // })

  // const {register,handleSubmit,formState : {errors}} = useForm<BlogPayload>({
  //   resolver : yupResolver(blogSchema),
  //   defaultValues : {
  //     authorEmail : user.email,
  //   }
  // });

  // const onSubmit = async (data : BlogPayload)=>{
  //   try{
  //     const response = await axios.post(API_URL_BLOG,{...data,authorEmail :user.email, date : new Date()});
  //     if(response.data){
  //       //successfully posted
  //       console.log("Successfully posted");
  //       navigate('/your-blogs')
  //     }
  //     else{
  //       //some error occured
  //       console.log("Some error occurred");
  //     }
  //   }
  //   catch(e){
  //     console.log(e);
  //   }
  // }

  return (
    // <div className='text-xl'>
    //     <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-10/12 mx-auto p-4 border border-slate rounded shadow gap-2'>

    //         <label className='text-left'>Give a title</label>
    //         <input type='text' {...register("title")} className='border-2 border-slate-300 rounded-lg'/>
    //         <p>{errors.title?.message}</p>

    //         <label className='text-left'>Your content</label>
    //         <textarea rows={10} {...register("content")} className='border-2 border-slate-300 rounded-lg'/>
    //         <p>{errors.content?.message}</p>

    //         <button className='bg-black text-white py-1 rounded-lg'>Publish</button>

    //     </form>
    // </div>
    <div>
      <ReactQuill theme='snow' value={blogContent} onChange={setBlogContent}>
        <div className='w-10/12'></div>
      </ReactQuill>
    </div>
  )
}

export default NewBlog