import { useForm } from 'react-hook-form';
import { signupPayload } from '../constants/types';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { API_URL_USER } from '../constants/env-variables';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { store } from '../state/store';

const Signup = () => {

  const [error,setError] = useState("");

  const navigate = useNavigate();

  const signupPayloadSchema = object({
    name : string().max(20).required(),
    email : string().email().required(),
    password : string().min(4).max(10).required(),
  })

  const {register,handleSubmit,formState : {errors}} = useForm<signupPayload>({
    resolver : yupResolver(signupPayloadSchema)
  });

  const onSubmit = async(data : signupPayload)=>{
    const response = await axios.post(API_URL_USER,data);
    if(response.data){
      //successful signup
      navigate("/");
      console.log(store.getState());
      store.dispatch({type : 'SET',payload : data});
    }
    else{
      //unsuccessful signup
      setError("Sign up failed")
    }
  }

  return (
    <div className='max-w-md mx-auto text-xl'>
      <form onSubmit={handleSubmit(onSubmit)} className='border border-slate shadow-md rounded-lg p-4 flex flex-col gap-2'>

        <label className='text-left'>Name</label>
        <input type='text' {...register('name')} className='border-b-2 outline-none'/>
        <p className='text-red-600'>{errors.name?.message}</p>

        <label className='text-left'>Email</label>
        <input type='text' {...register('email')} className='border-b-2 outline-none'/>
        <p className='text-red-600'>{errors.email?.message}</p>

        <label className='text-left'>Password</label>
        <input type='password' {...register('password')} className='border-b-2 outline-none'/>
        <p className='text-red-600'>{errors.password?.message}</p>

        <button className='bg-black text-white py-1 rounded-lg'>Sign up</button>

        <p>{error}</p>
      </form>
    </div>
  )
}

export default Signup