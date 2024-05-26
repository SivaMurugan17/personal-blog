import { useParams } from 'react-router-dom';
import QuillToolbar from '../../components/QuillToolbar';
import Textpad from '../../components/Textpad';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogById } from '../../service/blogService';
import { Blog } from '../../constants/types';

const EditBlog = () => {
    const { id } = useParams();

    const {data : blog, isLoading, isError} = useQuery<Blog>({
        queryKey : ['blog',id],
        queryFn : () => fetchBlogById(id)
    })

  return (
    <div className='w-4/5 mx-auto'>
        <QuillToolbar/>
        <Textpad contentToBeEdited={blog}/>
    </div>
  )
}

export default EditBlog