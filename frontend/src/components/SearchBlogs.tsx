import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { API_URL_BLOG } from '../constants/env-variables'
import { useState } from 'react'
import { Blog } from '../constants/types'
import { Link } from 'react-router-dom'

const SearchBlogs = () => {

    const [results,setResults] = useState([]);

    const searchBlogs = async ( keyword : string ) => {
        console.log(keyword)
        if(keyword.length === 0){
            setResults([]);
            return;
        }
        const { data } = await axios.get(`${API_URL_BLOG}/search?title=${keyword}`,{
            withCredentials : true
        });
        console.log(data);
        setResults(data);
    }


  return (
    <div className='w-8/12 mx-auto'>
        <section className='border-2 border-black rounded-lg p-2 flex gap-1 justify-between items-center'>
            <input
                onChange={(e)=>searchBlogs(e.target.value)} 
                className='outline-none basis-11/12'/>
            <FontAwesomeIcon icon={faSearch} className='basis-1/12'/>
        </section>
        {
            results.map((result : Blog)=>{
                return(
                    <div className='text-left fixed bg-white p-2'>
                        <Link to={`/blog/${result.id}`}>{result.title}</Link>
                    </div>
                )
            })
        }                                                                                  
    </div>
  )
}

export default SearchBlogs