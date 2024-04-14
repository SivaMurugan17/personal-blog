import { useState } from 'react';
import { Blog, Comment, State } from '../../../constants/types';
import { BLACK_BUTTON, INPUT_BOX_WITH_SLATE_COLOR } from '../../../constants/tailwind-classes';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { addComment, deleteComment } from '../../../service/commentService';
import { setComments } from '../../../slices/currentBlogSlice';

const CommentSection = ({ blog }: { blog: Blog }) => {
    const [text, setText] = useState("");

    const user = useSelector((state : State) => state.user.value);
    const comments = useSelector((state : State) => state.blog.comments);
    const dispatch = useDispatch();

    const addThisComment = (blogId : string, text : string, userEmail : string)=>{
        addComment(blogId,text,userEmail)
            .then( comments => dispatch(setComments(comments)));
    }

    const deleteThisComment = (blogId : string,commentId : string)=>{
        deleteComment(blogId, commentId)
            .then( comments => dispatch(setComments(comments)));
    }

    return (
        <div>
            <h2 className='text-left text-xl'>Add a comment</h2>
            <section className='flex'>
                <input onChange={(e) => setText(e.target.value)}
                    className={`${INPUT_BOX_WITH_SLATE_COLOR} basis-3/4`} />
                <button className={`${BLACK_BUTTON} basis-1/4`} onClick={()=> addThisComment(blog.id,text,user.email)}>Comment</button>
            </section>
            {
                comments.map((comment: Comment) => {
                    return (
                        <div className='text-left border rounded p-2 my-2'>
                            <article>
                                <span className='mr-2'>{comment.commentedBy.name}</span>
                                <span className='text-sm'>{new Date(comment.date).toDateString()}</span>
                            </article>
                            <article className='flex justify-between'>
                                <p className='text-2xl'>{comment.text}</p>
                                <button onClick={() => deleteThisComment(blog.id, comment.id)}
                                    className='text-red-600'><FontAwesomeIcon icon={faTrash} /></button>
                            </article>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CommentSection