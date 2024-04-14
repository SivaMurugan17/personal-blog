import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Blog } from '../../../constants/types'
import { Link } from 'react-router-dom'
import { searchBlogs } from '../../../service/blogService'

const SearchBlogs = () => {

    const [results,setResults] = useState([]);

    const search = (keyword : string)=>{
        searchBlogs(keyword)
        .then((res)=>setResults(res));
    }

  return (
    <div className='w-8/12 mx-auto my-4'>
        <section className='border-2 border-black rounded-full p-2 flex gap-1 justify-between items-center'>
            <input
                onChange={(e)=>search(e.target.value)} 
                placeholder='Search..'
                className='outline-none basis-11/12 p-1'/>
            <FontAwesomeIcon icon={faSearch} className='basis-1/12'/>
        </section>
        {
            results.map((result : Blog, index : number)=>{
                return(
                    <div className='text-left fixed bg-white p-2' key={index}>
                        <Link to={`/blog/${result.id}`}>{result.title}</Link>
                    </div>
                )
            })
        }                                                                                  
    </div>
  )
}

export default SearchBlogs