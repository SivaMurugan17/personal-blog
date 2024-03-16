import { Blog } from '../../../constants/types'
import ReactQuill from 'react-quill'
import { formats, modules } from '../../../components/QuillToolbar';
import CommentSection from './CommentSection'

const BlogContent = ({blog}:{blog : Blog}) => {
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
            <CommentSection blog={blog} />
        </div>
    )
}

export default BlogContent