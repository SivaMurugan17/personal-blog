import { useForm } from 'react-hook-form'
import { LoginPayload } from '../../constants/types';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { ColorRing } from 'react-loader-spinner';
import { INPUT_BOX_WITH_BOTTOM_LINE } from '../../constants/tailwind-classes';
import { setUser } from '../../slices/userSlice';
import { loginUser, loginWithGithub } from '../../service/userService';

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

  const onSubmit = async (loginPayload : LoginPayload)=>{
    loginUser(loginPayload)
    .then((data)=>{
      if(data != null){
        navigate("/")
        dispatch(setUser(data));
      }
      else{
        setError(data);
      }
      return data;
    })
  }

  const mutation = useMutation({
    mutationFn : onSubmit
  })

  return (
    <div className='text-xl px-8'>
      <h1 className='text-left text-3xl'>Welcome!</h1>
      <form onSubmit={handleSubmit((loginPayload)=>{
        mutation.mutate(loginPayload)
      })} 
        className='border border-slate shadow-md rounded-lg p-4 flex flex-col gap-2 max-w-md mx-auto'>

        <label className='text-left'>Email</label>
        <input type='text' {...register('email')} className={`${INPUT_BOX_WITH_BOTTOM_LINE}`}/>
        <p className='text-red-600'>{errors.email?.message}</p>

        <label className='text-left'>Password</label>
        <input type='password' {...register('password')} className={`${INPUT_BOX_WITH_BOTTOM_LINE}`}/>
        <p className='text-red-600'>{errors.password?.message}</p>

        <button className='bg-black text-white py-1 rounded-lg flex flex-row items-center justify-center'>
            <div>Login</div>
            {
              mutation.isPending && (
                <ColorRing 
                  colors={['#fff','#fff','#fff','#fff','#fff']}
                  height={50}
                  width={50}/>
              )
            }
        </button>
      
        <p>{error}</p>
      </form>
      <button onClick={loginWithGithub}>Login with Google</button>
      <button onClick={loginWithGithub}>Login with Github</button>
    </div>
  )
}

export default Login