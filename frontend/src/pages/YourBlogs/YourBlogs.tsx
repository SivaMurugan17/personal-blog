import { useSelector } from 'react-redux';
import { State, Blog } from '../../constants/types';
import BlogPreview from '../../components/BlogPreview';
import { fetchBlogsByUserEmail } from '../../service/blogService';
import { useQuery } from '@tanstack/react-query';

const YourBlogs = () => {

    const user = useSelector((state : State) => state.user.value);

    const { data : blogs, isLoading} = useQuery(
        {
            queryKey : ['yourBlogs'], 
            queryFn : ()=>fetchBlogsByUserEmail(user.email)
        }
    );

    if(isLoading)
        return <p className='text-xl'>Loading...</p>;

    if(blogs.length === 0)
        return <p className='text-xl'>You have no blogs yet</p>;


  return (
    <div className='p-8'>
        <h2 className='text-4xl text-left my-4'>Your blogs</h2>
        {
            blogs.map( (blog : Blog, index : number)  => {
                return <BlogPreview blog={blog} key={index}/>
            }) 
        }
    </div>
  )
}

export default YourBlogs