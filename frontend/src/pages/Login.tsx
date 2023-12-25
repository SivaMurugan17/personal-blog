import { useForm } from 'react-hook-form'
import { LoginPayload } from '../constants/types';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { API_URL_USER } from '../constants/env-variables';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Login = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [error,setError] = useState("");

  const loginPayloadSchema = object({
    email : string().email().required(),
    password : string().min(4).max(10).required()
  })

  const {register,handleSubmit,formState:{errors}} = useForm<LoginPayload>({
    resolver : yupResolver(loginPayloadSchema)
  });

  const onSubmit = async (data : LoginPayload)=>{
    const response = await axios.get(`${API_URL_USER}/${data.email}`);
    if(response.data == null){
      setError("Sign up first")
    }
    else if(response.data.password !== data.password){
      setError("Wrong password")
    }
    else{
      navigate("/")
      dispatch({type : 'SET', payload : response.data});
    }
  }

  return (
    <div className='max-w-md mx-auto text-xl'>
      <form onSubmit={handleSubmit(onSubmit)} className='border border-slate shadow-md rounded-lg p-4 flex flex-col gap-2'>

        <label className='text-left'>Email</label>
        <input type='text' {...register('email')} className='border-b-2 outline-none'/>
        <p className='text-red-600'>{errors.email?.message}</p>

        <label className='text-left'>Password</label>
        <input type='password' {...register('password')} className='border-b-2 outline-none'/>
        <p className='text-red-600'>{errors.password?.message}</p>

        <button className='bg-black text-white py-1 rounded-lg'>Login</button>

        <p>{error}</p>
      </form>
    </div>
  )
}

export default Login