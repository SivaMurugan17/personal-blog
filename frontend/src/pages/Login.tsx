import { useForm } from 'react-hook-form'
import { loginPayload } from '../constants/types';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Login = () => {

  const loginPayloadSchema = object({
    email : string().email().required(),
    password : string().min(4).max(10).required()
  })

  const {register,handleSubmit,formState:{errors}} = useForm<loginPayload>({
    resolver : yupResolver(loginPayloadSchema)
  });

  const onSubmit = (data : loginPayload)=>{
    console.log(data)
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

        <button className='bg-slate-300 py-1 rounded-lg'>Login</button>

      </form>
    </div>
  )
}

export default Login