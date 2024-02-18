import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Blog } from "../constants/types";
import { BLACK_TAG, ICON_ONLY_BUTTON } from "../tailwind/tailwind-classes";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const BlogPreview = (props : {blog : Blog}) => {
  const {blog} = props;

  const handleEdit = (id : string)=>{
    console.log("Edited")
  }

  const handleDelete = (id : string)=>{
    console.log("Deleted")
  }

  return (
    <div className='rounded-lg border border-slate shadow-md p-4 text-left'>
          <Link to={`/blog/${blog.id}`}>
            <div className="flex flex-col gap-1">
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
          </Link>
          <div> 
            <button className={`${ICON_ONLY_BUTTON} text-blue-600`} onClick={()=>handleEdit(blog.id)}><FontAwesomeIcon icon={faPenToSquare}/></button>
            <button className={`${ICON_ONLY_BUTTON} text-red-600`} onClick={()=>handleDelete(blog.id)}><FontAwesomeIcon icon={faTrash}/></button>
          </div>
    </div>
  )
}

export default BlogPreview