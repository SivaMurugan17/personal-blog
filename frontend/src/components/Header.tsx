import React from 'react'
import { Link } from 'react-router-dom'
import { store } from '../state/store'

const Header = () => {
  return (
    <div className='border-b-2 border-slate pb-4 my-4'>
      <nav className='px-8 flex flex-row gap-4'>
        <Link to="/" className='text-4xl'>A Bored SWE</Link>
        {
          store.getState().user == null ?
          (
            <>
              <Link to="/login" className='text-2xl ms-auto'>Log in</Link>
              <Link to="/signup" className='text-2xl'>Sign up</Link>
            </>
          ):
          (
            <Link to="/">Log out</Link>
          )
        }
      </nav>
    </div>
  )
}

export default Header