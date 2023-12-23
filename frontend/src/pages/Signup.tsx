import { useForm } from 'react-hook-form';
import { signupPayload } from '../constants/types';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Signup = () => {

  const signupPayloadSchema = object({
    email : string().email().required(),
    password : string().min(4).max(10).required(),
  })

  const {register,handleSubmit,formState : {errors}} = useForm<signupPayload>({
    resolver : yupResolver(signupPayloadSchema)
  });

  const onSubmit = (data : signupPayload)=>{
    console.log(data);
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
        <button>Sign up</button>
      </form>
    </div>
  )
}

export default Signup