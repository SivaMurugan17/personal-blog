import React from 'react'

const BlogPreview = () => {
  return (
    <div className='rounded-lg border border-slate shadow-md w-1/3 p-4 text-left'>
        <img src='https://static.thenounproject.com/png/1156518-200.png' alt='blog-image' className='mx-auto'/>
        <h3 className='text-2xl'>Heading</h3>
        <p>Author</p>
        <p>Date</p>
    </div>
  )
}

export default BlogPreview