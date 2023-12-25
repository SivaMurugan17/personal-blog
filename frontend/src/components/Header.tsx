import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../constants/types';

const Header = () => {

  const dispatch = useDispatch();

  const handleLogout = ()=>{
    dispatch({type : 'CLEAR'});
  }
  return (
    <div className='border-b-2 border-slate pb-4 my-4'>
      <nav className='px-8 flex flex-row gap-4'>
        <Link to="/" className='text-4xl'>A <span className='text-italic'>bored</span> SWE</Link>
        {
          useSelector((state : State) => state.user) == null ?
          (
            <>
              <Link to="/login" className='text-2xl ms-auto'>Log in</Link>
              <Link to="/signup" className='text-2xl'>Sign up</Link>
            </>
          ):
          (
            <button onClick={handleLogout} className='text-2xl ms-auto'>Log out</button>
          )
        }
      </nav>
    </div>
  )
}

export default Header