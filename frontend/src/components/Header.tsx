import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../constants/types';

const Header = () => {

  const dispatch = useDispatch();

  const user = useSelector((state : State) => state.user);

  const handleLogout = ()=>{
    dispatch({type : 'CLEAR'});
  }
  
  return (
    <div className='border-b-2 border-slate pb-4 my-4'>
      <nav className='px-8 flex flex-row gap-4'>
        <Link to="/" className='text-4xl'>A <span className='italic'>bored</span> SWE</Link>
        {
          user == null ?
          (
            <>
              <Link to="/login" className='bg-black text-white px-4 rounded-lg text-xl ms-auto'>Log in</Link>
              <Link to="/signup" className='text-xl'>Sign up</Link>
            </>
          ):
          (
            <>
              <Link to="/new-blog" className='text-2xl ms-auto'>New blog</Link>
              <Link to="/your-blogs" className='text-2xl'>Your blogs</Link>
              <p className='text-2xl'>{user.name}</p>
              <button onClick={handleLogout} className='bg-black text-white px-4 rounded-lg text-xl'>Log out</button>
            </>
          )
        }
      </nav>
    </div>
  )
}

export default Header