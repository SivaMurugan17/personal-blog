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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email:</label>
        <input type='text' {...register('email')}/>
        <p>{errors.email?.message}</p>
        <label>Password:</label>
        <input type='password' {...register('password')}/>
        <p>{errors.password?.message}</p>
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login