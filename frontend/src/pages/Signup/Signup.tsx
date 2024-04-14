import { useForm } from 'react-hook-form';
import { SignupPayload } from '../../constants/types';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { ColorRing } from 'react-loader-spinner';
import { INPUT_BOX_WITH_BOTTOM_LINE } from '../../constants/tailwind-classes';
import { setUser } from '../../slices/userSlice';
import { registerUser } from '../../service/userService';


const Signup = () => {

  const dispatch = useDispatch();

  const [error,setError] = useState("");

  const navigate = useNavigate();

  const signupPayloadSchema = object({
    name : string().max(20).required(),
    email : string().email().required(),
    password : string().min(4).max(10).required(),
  })

  const {register,handleSubmit,formState : {errors}} = useForm<SignupPayload>({
    resolver : yupResolver(signupPayloadSchema)
  });

  const onSubmit = async(signupPayload : SignupPayload)=>{
    registerUser(signupPayload)
    .then(( data )=>{
      navigate("/");
      dispatch(setUser(data));
      return data;
    })
    .catch(()=>{
      setError("Sign up failed")
    })
  }

  const mutation = useMutation({
    mutationFn : onSubmit
  })

  return (
    <div className='text-xl px-8'>
      <h1 className='text-left text-4xl'>Join us!</h1>
      <form 
        onSubmit={handleSubmit((signupPayload)=>{
          mutation.mutate(signupPayload)
        })} 
        className='border border-slate shadow-md rounded-lg p-4 flex flex-col gap-2 max-w-md mx-auto'>

        <label className='text-left'>Name</label>
        <input type='text' {...register('name')} className={`${INPUT_BOX_WITH_BOTTOM_LINE}`}/>
        <p className='text-red-600'>{errors.name?.message}</p>

        <label className='text-left'>Email</label>
        <input type='text' {...register('email')} className={`${INPUT_BOX_WITH_BOTTOM_LINE}`}/>
        <p className='text-red-600'>{errors.email?.message}</p>

        <label className='text-left'>Password</label>
        <input type='password' {...register('password')} className={`${INPUT_BOX_WITH_BOTTOM_LINE}`}/>
        <p className='text-red-600'>{errors.password?.message}</p>

        <button className='bg-black text-white py-1 rounded-lg flex flex-row items-center justify-center'>
          <span>Sign up</span>
          {
              mutation.isPending && (
                <ColorRing 
                  colors={['#fff','#fff','#fff','#fff','#fff']}
                  height={50}
                  width={50}/>
              )
            }
        </button>

        {mutation.isError && <p>Error</p>}
      </form>
    </div>
  )
}

export default Signup