import { Blog } from "../constants/types";


const BlogPreview = (props : {blog : Blog}) => {
  const {blog} = props;
  return (
    <div className='rounded-lg border border-slate shadow-md w-96 p-4 text-left'>
        <img src='https://static.thenounproject.com/png/1156518-200.png' alt="blog-preview" className='mx-auto'/>
        <h3 className='text-2xl'>{blog.title}</h3>
        <p>{blog.authorName}</p>
        <p>{new Date(blog.date).toDateString()}</p>
    </div>
  )
}

export default BlogPreview