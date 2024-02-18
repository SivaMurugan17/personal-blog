import { useQuery } from '@tanstack/react-query'
import { BLACK_TAG, HEADING_H1 } from '../../../constants/tailwind-classes'
import axios from 'axios'
import { API_URL_TAG } from '../../../constants/env-variables'
import { Tag } from '../../../constants/types'

const TagSection = () => {
    const loadTags = async()=>{
        const { data} = await axios.get(`${API_URL_TAG}`,{
            withCredentials : true
        })
        return data;
    }
    const { data : tags, isLoading} = useQuery({
        queryKey : ['tags'],
        queryFn : loadTags
    })

  return (
    <section className='w-10/12 mx-auto'>
        <h1 className={`${HEADING_H1} my-4`}>Tags</h1>
        <div className='max-w-xs'>
        {
            isLoading ? <p>Loading...</p> :
            tags.map((tag : Tag, index : number)=>{
                return <span className={`${BLACK_TAG} mx-0.5`} key={index}>{tag.name}</span>
            })
        }
        </div>
    </section>
  )
}

export default TagSection