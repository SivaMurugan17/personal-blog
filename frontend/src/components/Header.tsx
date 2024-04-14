import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../constants/types';
import { BLACK_BUTTON } from '../constants/tailwind-classes';
import { clearUser } from '../slices/userSlice';
import { logoutUser } from '../service/userService';

const Header = () => {

  const dispatch = useDispatch();

  const user = useSelector((state : State) => state.user.value);

  const handleLogout = async ()=>{
    logoutUser();
    dispatch(clearUser());
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