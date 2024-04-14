import ReactQuill from 'react-quill'
import { formats, modules } from '../../../components/QuillToolbar';
import CommentSection from './CommentSection'
import Likes from './Likes';
import { useSelector } from 'react-redux';
import { State } from '../../../constants/types';

const BlogContent = () => {
    
    const blog = useSelector((state : State) => state.blog)

    return (
        <div>
            <section className='sticky top-0 bg-white z-10 py-4'>
                <h2 className='text-4xl text-left'>{blog.title}</h2>
            </section>
            <section className='flex gap-2'>
                <p className='text-left italic'>{`- ${blog.author.name}`} |</p>
                <p className='text-left'>{new Date(blog.date).toDateString()}</p>
            </section>
            <div id='toolbar'></div>
            <ReactQuill id='1'
                theme='snow'
                value={blog.content}
                modules={modules}
                formats={formats}
                readOnly />
            <Likes/>
            <CommentSection/>
        </div>
    )
}

export default BlogContent