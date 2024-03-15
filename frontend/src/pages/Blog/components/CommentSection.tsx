import { useEffect, useState } from 'react';
import { Blog, Comment, State } from '../../../constants/types';
import { BLACK_BUTTON } from '../../../constants/tailwind-classes';
import axios from 'axios';
import { API_URL_BLOG, API_URL_COMMENT } from '../../../constants/env-variables';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as redHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as whiteHeart } from '@fortawesome/free-regular-svg-icons';

const CommentSection = (props : {blog : Blog}) => {
    const [ text,setText ] = useState("");
    const [ isCurrentUserLiked, setIsCurrentUserLiked ] = useState(false); 
    const user = useSelector((state : State) => state.user);

    const addComment = async ()=>{
        const { data } = await axios.post(`${API_URL_COMMENT}/${props.blog.id}`,{
            text,
            commentedBy : user.email
        },{
            withCredentials : true
        })
        console.log(data);
    }

    const deleteComment = async (id : string)=>{
        const { data } = await axios.delete(`${API_URL_COMMENT}?blogId=${props.blog.id}&commentId=${id}`,{
            withCredentials : true
        })
        console.log(data);
    }

    const checkUserLiked = ()=>{
        let flag = false;
        console.log(user.email)
        console.log(props.blog.likedBy)
        props.blog.likedBy.map((email)=>{
            if(email === user.email)flag=true;
        })
        setIsCurrentUserLiked(flag);
    }

    const likePost = async ()=>{
        // setIsCurrentUserLiked(true);
        const { data } = await axios.post(`${API_URL_BLOG}/like?userEmail=${user.email}&blogId=${props.blog.id}`);
        console.log(data);
    }

    const unlikePost = async()=>{
        // setIsCurrentUserLiked(false);
        const { data } = await axios.delete(`${API_URL_BLOG}/like?userEmail=${user.email}&blogId=${props.blog.id}`);
        console.log(data);
    }

    useEffect(()=>{
        checkUserLiked();
    },[])

  return (
    <div>
        <p>Likes : {props.blog.likedBy.length}</p>
        {
            isCurrentUserLiked ? 
            <button 
                onClick={unlikePost}
                className='text-red-600'>
                    <FontAwesomeIcon icon={redHeart}/>
            </button>
            :
            <button
                onClick={likePost}>
                <FontAwesomeIcon icon={whiteHeart}/>
            </button>
        }
        <h2 className='text-left text-xl'>Add a comment</h2>
        <section className='flex justify-between'>
            <input onChange={(e)=>setText(e.target.value)}
                className='no-outline border-2 basis-3/4'/>
            <button className={`${BLACK_BUTTON}`} onClick={addComment}>Comment</button>
        </section>
        {
            props.blog.comments.map((comment : Comment)=>{
                return (
                    <div className='text-left mb-1'>
                        <article>
                            <span>{comment.commentedBy.name}</span>
                            <span>{new Date(comment.date).toDateString()}</span>
                        </article>
                        <p>{comment.text}</p>
                        <button onClick={()=>deleteComment(comment.id)} 
                            className='text-red-600'><FontAwesomeIcon icon={faTrash}/></button>
                    </div>
                )
            })
        }
    </div>
  )
}

export default CommentSection