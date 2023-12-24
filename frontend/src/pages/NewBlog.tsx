import React from 'react'
import { useForm } from 'react-hook-form'
import { blog } from '../constants/types';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const NewBlog = () => {

  const blogSchema = object({
    title : string().required(),
    content : string().required(),
    authorEmail : string().email().required()
  })

  const {register,handleSubmit,formState : {errors}} = useForm<blog>({
    resolver : yupResolver(blogSchema)
  });

  const onSubmit = (data : blog)=>{
    console.log(data);
  }

  return (
    <div className='text-xl'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-10/12 mx-auto p-4 border border-slate rounded shadow gap-2'>

            <label className='text-left'>Give a title</label>
            <input type='text' {...register("title")} className='border-2 border-slate-300 rounded-lg'/>
            <p>{errors.title?.message}</p>

            <label className='text-left'>Your content</label>
            <textarea rows={10} {...register("content")} className='border-2 border-slate-300 rounded-lg'/>
            <p>{errors.content?.message}</p>

            <button className='bg-slate-300 py-1 rounded-lg'>Publish</button>

        </form>
    </div>
  )
}

export default NewBlog