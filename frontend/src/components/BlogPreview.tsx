import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Blog } from "../constants/types";
import { BLACK_TAG, ICON_ONLY_BUTTON } from "../constants/tailwind-classes";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL_BLOG } from "../constants/env-variables";


const BlogPreview = (props : {blog : Blog}) => {
  const {blog} = props;
  const navigate = useNavigate();

  const handleEdit = (id : string)=>{
    navigate(`/edit-blog/${id}`)
  }

  const handleDelete = async(id : string)=>{
    await axios.delete(`${API_URL_BLOG}/${id}`);
    console.log("deleted");
  }

  return (
    <div className='rounded-lg border border-slate shadow-md p-4 text-left'>
          <Link to={`/blog/${blog.id}`}>
            <div className="flex flex-col gap-1">
              <h3 className='text-2xl'>{blog.title}</h3>
              <p className="italic">{blog.author.name}</p>
              <p>{new Date(blog.date).toDateString()}</p>
              <div className="flex gap-1">
                {
                  blog.tags?.map((tag :string, index : number)=>{
                    return <span className={`${BLACK_TAG}`} key={index}>{tag}</span>
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