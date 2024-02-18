import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../constants/types';
import axios from 'axios';
import { API_URL_AUTH } from '../constants/env-variables';
import { BLACK_BUTTON } from '../constants/tailwind-classes';

const Header = () => {

  const dispatch = useDispatch();

  const user = useSelector((state : State) => state.user);

  const handleLogout = async ()=>{
    await axios.post(API_URL_AUTH+"/logout",null,{
      withCredentials : true
    });
    dispatch({type : 'CLEAR'});
  }
  
  return (
    <div className='border-b-2 border-slate pb-4 my-4'>
      <nav className='px-8 flex flex-row gap-4 text-xl'>
        <Link to="/" className='text-4xl'>A <span className='italic'>bored</span> SWE</Link>
        {
          user == null ?
          (
            <>
              <Link to="/login" className={`${BLACK_BUTTON} ms-auto`}>Log in</Link>
              <Link to="/signup" className='text-xl'>Sign up</Link>
            </>
          ):
          (
            <>
              <Link to="/new-blog" className='text-2xl ms-auto'>New blog</Link>
              <Link to="/your-blogs" className='text-2xl'>Your blogs</Link>
              <p className='text-2xl'>{user.name}</p>
              <button onClick={handleLogout} className={`${BLACK_BUTTON}`}>Log out</button>
            </>
          )
        }
      </nav>
    </div>
  )
}

export default Header