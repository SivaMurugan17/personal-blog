import React from 'react'

const NewBlog = () => {
  return (
    <div className='text-xl'>
        <form className='flex flex-col w-10/12 mx-auto p-4 border border-slate rounded shadow gap-2'>

            <label className='text-left'>Give a title</label>
            <input type='text' className='border-2 border-slate-300 rounded-lg'/>

            <label className='text-left'>Your content</label>
            <textarea rows={10} className='border-2 border-slate-300 rounded-lg'/>

            <button className='bg-slate-300 py-1 rounded-lg'>Publish</button>

        </form>
    </div>
  )
}

export default NewBlog