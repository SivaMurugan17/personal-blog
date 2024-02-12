import { Blog } from "../constants/types";
import { BLACK_TAG } from "../tailwind/tailwind-classes";


const BlogPreview = (props : {blog : Blog}) => {
  const {blog} = props;
  return (
    <div className='rounded-lg border border-slate shadow-md p-4 text-left flex flex-col gap-1'>
          <h3 className='text-2xl'>{blog.title}</h3>
          <p className="italic">{blog.authorName}</p>
          <p>{new Date(blog.date).toDateString()}</p>
          <div className="flex gap-1">
          {
            blog.tags?.map((tag)=>{
              return <span className={`${BLACK_TAG}`}>{tag}</span>
            })
          }
          </div>
    </div>
  )
}

export default BlogPreview